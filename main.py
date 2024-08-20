from microdot_asyncio import Microdot, Response, send_file
from microdot_utemplate import render_template
from microdot_asyncio_websocket import with_websocket
from bme_module import BME280Module
import sh1106
from powerLab import POWERlab
from machine import Pin, I2C, ADC
import ujson
import random
import time
from boot import do_connect

ZERO_POINT_VOLTAGE = 0.4 # Level Tegangan dasar untuk sensor tertentu
SENSITIVITY = 0.05 # Sensitivitas sensor untuk mendeteksi perubahan
adc = ADC(Pin(26)) 

I2C_ID = 1
SCL_PIN = 7
SDA_PIN = 6
i2c = I2C(1, scl=Pin(7), sda=Pin(6), freq=400000)

ip= do_connect()
print('Get IP :', ip)

bme_module = BME280Module(I2C_ID,SCL_PIN,SDA_PIN)
display = sh1106.SH1106_I2C(128, 64, i2c, Pin(2), 0x3c)

app = Microdot()
Response.default_content_type = 'text/html'

l1 = POWERlab(15) # LED MERAH
l2 = POWERlab(16) # LED KUNING
l3 = POWERlab(17) # LED HIJAU
bz = POWERlab(14) # BUZZER

l1.offPower() 
l2.offPower()
l3.offPower()
bz.offPower()

def update_display(temp, hum, press, alt, co, status):
    try:
        display.fill(0)  # Membersihkan tampilan OLED
        # Dalam menampilkan garis membutuhkan 4 parameter yaitu titik X, titik Y, Panjang garis, warna
        display.hline(0, 0, 127, 1) # Garis pada bagian atas judul 'Monitoring'
        display.hline(0, 12, 127, 1) # Garis pada bagian bawah judul 
        display.hline(0, 25, 127, 1) # Garis pada bagian atas tulisan 'Status'
        display.hline(0, 37, 127, 1) # Garis pada bagian bawah tulisan 'Status'
        display.hline(0, 63, 127, 1) # Garis pada bagian atas alamat IP
        display.hline(0, 53, 127, 1) # Garis pada bagian bawah alamat IP
        display.vline(0, 0, 65, 1) # Garis Tepi bagian Kiri
        display.vline(127, 0, 65, 1) # Garis Tepi bagian Kanan
        # Dalam menampilkan Kotak membutuhkan 5 parameter yaitu titik X, titik Y, Panjang, Lebar, warna
        display.fill_rect(0, 37, 5, 30, 1) # Kotak pada bagian Kiri Bawah berwarna putih  
        display.fill_rect(123, 37, 5, 30, 1) # Kotak pada bagian Kanan Bawah berwarna putih
        display.text('Monitoring', 23, 3) # Menampilkan tulisan "Monitoring"
        display.text(f'T:{temp:.0f}C',0, 15) # Menampilkan tulisan "T :" dengan nilai suhu disebelahnya
        display.text(f'Co:{co:.1f} PM', 45, 15) # Menampilkan tulisan "CO :" dengan nilai CO dan satuannya 
        display.text(f'Status',43, 28) # Menampilkan tulisan "Status"
        display.text(f'{status}',14, 42) # Menampilkan hasil kondisi dari CO yang ada
        display.text(f'{ip}', 10, 55) # Menampilkan alamat ip yang digunakan
        display.show() # Merender ke layar OLED
    except Exception as e:
        print("Error updating display:", e) # Tampilan jika terjadi kesalahan 
   
@app.route('/') # Rute URL
async def index(request): 
    return render_template('index.html') #Render Template index.html

@app.route('/updateData') # Rute URL
async def get_sensor_data(request):
    print("Receive get data request!")
    ip= do_connect()    # Inisialisasi fungsi do_connect() untuk mengambil alamat IP
    # Membaca nilai dari sensor BME-280
    sensor_reads_temp, sensor_reads_press, sensor_reads_hum, sensor_reads_alt = bme_module.get_sensor_readings()
    raw_value = adc.read_u16() # Membaca nilai Analog dari pin ADC
    co = round((raw_value * 3.3 / 65535) * 100,2) # Mengubah nilai Analog menjadi nilai CO
    print('CO:', co) # Menampilkan nilai CO pada Shell
    # Kondisi untuk perubahan status berdasarkan nilai CO
    if co <= 50:
        status = "Baik"
    elif co <=100:
        status = "Sedang"
    elif co <= 199:
        status = "Tidak Sehat"
    elif co <= 299:
        status = "Sgt Tdk Sehat"
    else:
        status="Berbahaya"
    
    update_display(sensor_reads_temp, sensor_reads_hum, sensor_reads_press, sensor_reads_alt, co, status)
    
    # Mengembalikan data sensor dan IP ke format JSON
    return ujson.dumps({
        "readingTemp": sensor_reads_temp, # Data Suhu ke format JSON
        "readingHum": sensor_reads_hum, # Data Kelembaban ke format JSON
        "readingPress": sensor_reads_press, # Data Tekanan ke format JSON 
        "readingAlt": sensor_reads_alt, # Data Ketinggian ke format JSON
        "readingCO": co, # Data CO ke format JSON
        "ip":ip # Data IP yang digunakan ke format JSON
    })

@app.route("/ws") # Rute WebSocket
@with_websocket
async def kontrolButton(request, ws): # Membuat fungsi untuk mengontrol Button yang ada di website
    while True: # Loop yang berjalan terus-menerus untuk menangani pesan WebSocket
        data = await ws.receive() # Menunggu dan menerima pesan WebSocket
        print(data)
        if data == 'on1': 
            l1.onPower()
        if data == 'off1':          
          l1.offPower()
          
        if data == 'on2':
            l2.onPower()
        if data == 'off2':
            l2.offPower()

        if data == 'on3':
            l3.onPower()
        if data == 'off3':
            l3.offPower()
            
        if data == 'on4':
            bz.onPower()
        if data == 'off4':
            bz.offPower()
            
        await ws.send("OK") # Mengirim respons 'OK' kembali ke klien

@app.route('/shutdown') # Rute untuk mematikan server
async def shutdown(request):
    request.app.shutdown() # Mematikan server microdot
    return 'The server is shutting down...'

@app.route('/static/<path:path>') # Rute pelayanan file statis dari directory 'static'
def static(request, path):
    if '..' in path:
        # directory traversal is not allowed
        return 'Not found', 404
    return send_file('static/' + path) # Mengirim file yang diminta

if __name__ == "__main__":
    try:
        app.run(debug = True, host='192.168.57.69') # di run dalam mode debug dengan IP 
    except KeyboardInterrupt: # Memberhentikan proses tanpa menampilkan error jika ada interupsi
        pass