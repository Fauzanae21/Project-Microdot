                /* TEMPERATURE GAUGE */

// FUNGSI UNTUK MENGAMBIL DATA SUHU AKTUAL DARI SERVER
function fetchTemperatureData() {
    return fetch(`/updateData`)
        .then((response) => response.json())
        .then(data => {
            return data.readingTemp; // MENDAPARKAN NILAI SUHU DARI SERVER
        })
        .catch(error => {
            console.error("Error fetching temperature data:", error);
            return 0; // MENGEMBALIKAN NILAI 0 JIKA TERJADI ERROR
        });
}

// FUNGSI UNTUK MEMPERBARUI SUHU
function updateTemperatureGauge() {
    const gaugeElement = document.querySelector(".gauge-card-1 .gauge");
    fetchTemperatureData()
        .then(temperatureInCelsius => {
            const normalizedTemperature = temperatureInCelsius / 100; // NORMALISASI NILAI SUHU DARI RANGE O KE 1
            setTemperatureGaugeValue(gaugeElement, normalizedTemperature);
            setTimeout(updateTemperatureGauge, 6000); // MEMPERBARUI SETIAP 6 DETIK
        });
}

// FUNGSI UNTUK MENGATUR NILAI SUHU
function setTemperatureGaugeValue(gauge, value) {
    if (value < 0 || value > 1) {
        return;
    }
    const angle = value * 180; // MENGKONVERSI NILAI YANG DINORMALISASI MENJADI SUDUT (0 HINGGA 180 DERAJAT)
    gauge.querySelector(".gauge__fill").style.transform = `rotate(${angle}deg)`;
    gauge.querySelector(".gauge__cover").textContent = `${Math.round(value * 100)}°C`; // DISPLAY SATUAN SUHU YAITU CELCIUS
}
updateTemperatureGauge(); // MEMULAI MEMPERBARUI NILAI SUHU



                /* TEMPERATURE GAUGE */

// FUGSI UNTUK MENGAMBIL DATA AKTUAL KELEMBABAN DARI SERVER
function fetchHumidityData() {
    return fetch(`/updateData`)
        .then((response) => response.json())
        .then(data => {
            return data.readingHum; // MENDAPATKAN NILAI KELEMBABAN DARI SERVER
        })
        .catch(error => {
            console.error("Error fetching humidity data:", error);
            return 0; // MENGEMBALIKAN NILAI KE 0 JIKA TERJADI ERROR ATAU KESALAHAN
        });
}

// FUNGSI UNTUK MEMPERBARUI NILAI KELEMBABAN
function updateHumidityGauge() {
    const gaugeElement = document.querySelector(".gauge-card-2 .gauge");
    fetchHumidityData()
        .then(humidityInPercentage => {
            const normalizedHumidity = humidityInPercentage / 100; // NORMALISASI NILAI KELEMBABAN DARI RANGE 0 KE 1
            setHumidityGaugeValue(gaugeElement, normalizedHumidity);
            setTimeout(updateHumidityGauge, 6000); // MEMPERBARUI SETIAP 6 DETIK
        });
}

// FUNGSI UNTUK MENGATUR NILAI KELEMBABAN
function setHumidityGaugeValue(gauge, value) {
    if (value < 0 || value > 1) {
        return;
    }
    const angle = value * 180; // MENGKONVERSI NILAI YANG DINORMALISASI MENJADI SUDUT (0 HINGGA 180 DERAJAT)
    gauge.querySelector(".gauge__fill").style.transform = `rotate(${angle}deg)`;
    gauge.querySelector(".gauge__cover").textContent = `${Math.round(value * 100)}%`; // DISPLAY NILAI KELEMBABAN
}
updateHumidityGauge(); // MEMULAI MEMPERBARUI GAUGE KELEMBABAN



                /* ALTITUDE GAUGE */

// FUGSI UNTUK MENGAMBIL DATA AKTUAL KETINGGIAN DARI SERVER
function fetchAltitudeData() {
    return fetch(`/updateData`)
        .then((response) => response.json())
        .then(data => {
            return data.readingAlt; // MENDAPATKAN NILAI KETINGGIAN DARI SERVER
        })
        .catch(error => {
            console.error("Error fetching altitude data:", error);
            return 0; // MENGEMBALIKAN NILAI (0) KETIKA TERJADI ERROR
        });
}

// FUNGSI UNTUK MEMPERBARUI NILAI KETINGGIAN
function updateAltitudeGauge() {
    const gaugeElement = document.querySelector(".gauge-card-3 .gauge");
    fetchAltitudeData()
        .then(altitudeInMetre => {
            const normalizedAltitude = altitudeInMetre / 1000; // NORMALISASI NILAI KETINGGIAN DARI RANGE 0 KE 1
            setAltitudeGaugeValue(gaugeElement, normalizedAltitude);
            setTimeout(updateAltitudeGauge, 6000); //  MEMEPERBARUI NILAI KETINGGIAN SETIAP 6 DETIK
        });
}

// FUNGSI UNTUK MENGATUR NILAI KETINGGIAN
function setAltitudeGaugeValue(gauge, value) {
    if (value < 0 || value > 1) {
        return;
    }
    gauge.querySelector(".gauge__fill").style.transform = `rotate(${value / 2}turn)`;
    gauge.querySelector(".gauge__cover").textContent = `${Math.round(value * 1000)} m`; // DISPLAY KETINGGIAN MENGGUNAKAN SATUAN METER
}
updateAltitudeGauge(); // MEMULAI MEMPERBARUI NILAI KETINGGIAN



                /* PRESSURE GAUGE */

// FUNGSI UNTUK MENGAMBIL DATA AKTUAL TEKANAN DARI SERVER
function fetchPressureData() {
    return fetch(`/updateData`)
        .then((response) => response.json())
        .then(data => {
            return data.readingPress; // MENDAPATKAN NILAI TEKANAN DARI SERVER
        })
        .catch(error => {
            console.error("Error fetching pressure data:", error);
            return 0; // MENGEMBALIKAN NILAI (0) KETIKA TERJADI ERROR
        });
}

// FUNGSI UNTUK MEMPERBARUI NILAI TEKANAN
function updatePressureGauge() {
    const gaugeElement = document.querySelector(".gauge-card-4 .gauge");
    fetchPressureData()
        .then(PressureInHpa => {
            const normalizedPressure = PressureInHpa / 6000; // NORMALISASI NILAI TEKANAN DARI RAANGE 0 KE 1
            setPressureGaugeValue(gaugeElement, normalizedPressure);
            setTimeout(updatePressureGauge, 6000); // MEMPERBARUI NILAI SETIAP 6 DETIK
        });
}

// FUNGSI UNTUK MENGATUR NILAI TEKANAN
function setPressureGaugeValue(gauge, value) {
    if (value < 0 || value > 1) {
        return;
    }
    gauge.querySelector(".gauge__fill").style.transform = `rotate(${value * 180}deg)`;
    gauge.querySelector(".gauge__cover").textContent = `${(value * 6000).toFixed(2)} hPa`; // DISPLAY SATUAN TEKANAN YAITU HPA
}
updatePressureGauge(); // MEMULAI MEMPERBARUI GAUGE TEKANAN



                /* CO GAUGE */

// FUNGSI UNTUK MENGAMBIL DATA AKTUAL CO DARI SERVER
function fetchCOData() {
    return fetch(`/updateData`)
        .then((response) => response.json())
        .then(data => {
            return data.readingCO; // Get the CO value from the server response
        })
        .catch(error => {
            console.error("Error fetching CO data:", error);
            return 0; // Return default value (0) if there is an error
        });
}

// FUNGSI UNTUK MEMPERBARUI NILAI CO
function updateCOGauge() {
    const gaugeElement = document.querySelector(".gauge-card-6 .gauge");
    fetchCOData()
        .then(COInPPM => {
            const normalizedCO = Math.min(COInPPM / 1000, 1); // NORMALISASI NILAI CO DARI RANGE 0 KE 1
            setCOGaugeValue(gaugeElement, normalizedCO);
            setTimeout(updateCOGauge, 6000); // MEMPERBARUI SETIAP 6 DETIK
        });
}

/* FUNGI UNTUK MENGATUR NILAI DAN KONDISI CO YANG AKAN TERTAMPIL PADA CARD STATUS */
function updateCOStatus() {
    const statusElement = document.querySelector(".quality h5");
    fetchCOData()
        .then(CoValue => {
            if (CoValue <= 50) {
                statusElement.textContent = "Baik";
            }else if (CoValue <= 100){
                statusElement.textContent = "Sedang";
            }else if (CoValue <= 199){
                statusElement.textContent = "Tidak Sehat";
            }else if (CoValue <= 299){
                statusElement.textContent = "Sangat Tidak Sehat";
            }
            else{
                statusElement.textContent = "Berbahaya";
            }
            setTimeout(updateCOStatus, 6000); // MEMPERBARUI SETIAP 6 DETIK
        });
}
updateCOStatus();

// FUNGSI UNTUK MENGATUR NILAI CO
function setCOGaugeValue(gauge, value) {
    if (value < 0 || value > 1) {
        return;
    }
    const angle = value * 180
    gauge.querySelector(".gauge__fill").style.transform = `rotate(${angle}deg)`;
    gauge.querySelector(".gauge__cover").textContent = `${(value * 1000).toFixed(2)} PM`; // DISPLAY SATUAN CO, YAITU PM
}
updateCOGauge(); // MULAI MEMPERBARUI NILAI GAUGE CO



            /* LINE CHART PADA CARD SUHU,KELEMBABAN */

// FUNGI UNTUK MEMPERBARUI CHART DATA DAN LABEL
function updateChart(chart, temperatureData, humidityData, label) {
    if (chart.data.labels.length >= 30) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
        chart.data.datasets[1].data.shift();
    }
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(temperatureData);
    chart.data.datasets[1].data.push(humidityData);
    chart.update();
}

// FUNGSI UNTUK MEMBUAT LINE CHART PADA CARD SUHU,KELEMBABAN
function createLineChart() {
    const ctx = document.getElementById('lineChart').getContext('2d');
    const lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: [],
                    borderColor: '#E7D7C4',
                    backgroundColor: 'rgba(255, 133, 81, 0.2)',
                    tension: 0.4,
                    fill: true,
                },
                {
                    label: 'Humidity (%)',
                    data: [],
                    borderColor: '#BA7E76',
                    backgroundColor: 'rgba(255, 184, 77, 0.2)',
                    tension: 0.4,
                    fill: true,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'category',
                    display: true,
                    grid: {
                        display: false,
                    },
                },
                y: {
                    display: true,
                    grid: {
                        display: true,
                    },
                },
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                },
            },
        },
    });

    return lineChart;
}

// FUNGSI UNTUK MEMPERBARUI LINE CHART SETIAP 15 DETIK
function startUpdatingChart() {
    const lineChart = createLineChart();
    setInterval(async () => {
        const temperatureData = await getActualTemperatureData();
        const humidityData = await getActualHumidityData();
        const currentTime = moment().format('HH:mm');
        updateChart(lineChart, temperatureData, humidityData, currentTime);
    }, 15000); // MENGATUR INTERVAL KE 15 DETIK
}

// FUNGSI UNTUK MENGAMBIL DATA AKTUAL SUHU DARI SERVER
async function getActualTemperatureData() {
    const response = await fetch('/updateData');
    const data = await response.json();
    return data.readingTemp;
}

// FUNGSI UNTUK MENGAMBIL DATA AKTUAL KELEMBABAN DARI SERVER
async function getActualHumidityData() {
    const response = await fetch('/updateData');
    const data = await response.json();
    return data.readingHum;
}
startUpdatingChart(); // UNTUK MEMULAI PEMBARUAN LINE CHART



                /* STATUS */

/* FUNGSI UNTUK MEMBUAT MENGUBAH KONDISI DARI ON KE OFF PADA BUTTON ALARM */
async function changeCaption(value) {
                var captionElement = document.querySelector('.quality h5');
                captionElement.textContent = value;
                }
                document.getElementById('Hijau4').addEventListener('click', function (){
                    changeCaption('WARNING!!'); //ketika button alarm hijau di tekan maka akan tertampil text WARNING!! pada card status
                });
                document.getElementById('Merah4').addEventListener('click', function (){
                    changeCaption('SAFE'); //ketika button alarm merah di tekan maka akan tertampil text SAFE!! pada card status
                });

/* FUNGSI UNTUK MEMBUAT MENGUBAH KONDISI DARI ON KE OFF PADA BUTTON GARDEN */
async function changeCaption1(value) {
                var captionElement = document.querySelector('.lamp1 h3');
                captionElement.textContent = value;
                }
                document.getElementById('Hijau1').addEventListener('click', function () {
                    changeCaption1('ON'); //ketika button garden hijau di tekan maka akan tertampil text ON pada card status
                });
                document.getElementById('Merah1').addEventListener('click', function () {
                    changeCaption1('OFF'); //ketika button garden merah di tekan maka akan tertampil text OFF pada card status
                });

/* FUNGSI UNTUK MEMBUAT MENGUBAH KONDISI DARI ON KE OFF PADA BUTTON TERRACE */
async function changeCaption2(value) {
                var captionElement = document.querySelector('.lamp2 h3');
                captionElement.textContent = value;
                }
                document.getElementById('Hijau2').addEventListener('click', function () {
                    changeCaption2('ON'); //ketika button terrace hijau di tekan maka akan tertampil text ON pada card status
                });
                document.getElementById('Merah2').addEventListener('click', function () {
                    changeCaption2('OFF'); //ketika button terrace merah di tekan maka akan tertampil text OFF pada card status
                });

/* FUNGSI UNTUK MEMBUAT MENGUBAH KONDISI DARI ON KE OFF PADA BUTTON ROOM */
async function changeCaption3(value) {
                var captionElement = document.querySelector('.lamp3 h3');
                captionElement.textContent = value;
                }
                document.getElementById('Hijau3').addEventListener('click', function () {
                    changeCaption3('ON'); //ketika button room hijau di tekan maka akan tertampil text ON pada card status
                });
                document.getElementById('Merah3').addEventListener('click', function () {
                    changeCaption3('OFF'); //ketika button room merah di tekan maka akan tertampil text OFF pada card status
                });

// MENGAMBIL DATA IP DARI SERVER
async function fetchIpData() {
    try {
        const response = await fetch('/updateData');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP data:', error);
        return '0.0.0.0'; // MENAMPILKAN IP 0.0.0.0 JIKA TERJADI KESALAHAN ATAU ERROR
    }
}

// MEMPERBARUI TAMPILAN IP PADA HALAMAN WEB
async function updateIpDisplay() {
    const displayElement = document.querySelector('.ip h3');
    try {
         const ipAddress = await fetchIpData();
        displayElement.textContent = `${ipAddress}`; // MENAMPILKAN ALAMAT IP DI ELEMEN YANG DIPILIH
        setTimeout(updateIpDisplay, 6000); // MENGULANGI PEMBARUAN SETIAP 6 DETIK
    } catch (error) {
        console.error('Error updating IP display:', error);
    }
}
updateIpDisplay(); // MEMANGGIL FUNCTION UNTUK MENGUPDATE IP