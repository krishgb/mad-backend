import express from 'express'
import { search, category, home, api } from './controllers/index.js'
import fire from 'firebase-admin'

const admin = fire.initializeApp({
    credential: fire.credential.cert({
        "type": "service_account",
        "project_id": "bird-iot",
        "private_key_id": "51b32b6538789af137c4f2659853673ea7942102",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCh1AZtXFMGpIr3\nsfNIP7k34o7Q3IdERrbT8dtRl4mEMstqNXa3Mj+KJssVYkSmo8aojiZ0N4Xo7SR4\n0TWZ42CvUCPxXWtUO5umElpcLY0pRYWqpBFDSUOwVyV5HJNLd+jPhoSwEWis7iG8\nhibIAAArnBKzu1Uq0lV87NSgYO0i3GAnu+Z3o0x+mfY9epU0RtKUAz3r30NOD8Cb\nK+3soEO3kpHnSstveqh2IjhXtALNZA7tQneHD426Y2KydSem26BnBsljCsTRpnJG\nJc1Bcl3gCUKNaq9SgQeDbIVIGJauopmhvNK35j+1AiVpRznx+Ff3rsz2YK/bht1p\neKj7d7EpAgMBAAECggEAALAa/slMLAdxCIGywvl6Xzzudyc8hvDTPn6iN3LBLb4Y\nZ++POFL2VRt4pcn7broDp6/TNkdPrrJwS1QbaywtUgoT6pM77wb9BSN5p4ZmqUsZ\nKIrsuF/Poxtq6J5Z/bxQ7yqLZtN8HnP33w2E4pTqwJoJ74tZHRqJsBVdB6qg/f8e\nF8vkwjTTjB5zgDar4d8g/nnZl7XsiYEupAOqZ1ggRDnV8SJEoxq+QCXOVWp+/KQB\nnjFnSYSsD20sP+iDv51G5mf5Tn35xCqhpbFiOmnnkpuTRyaiKz5VN6t+88eDt8Do\nxuJVJdk9DXrntOd61wlIKo5BtHaTxcY5bWgpkGtEzQKBgQDVJRAnlrJtrH3MOm3p\n/fXVoKNPI//gWaAWgUI5M51i7tb7Z4AbRmLcRyzMfEZ1wmEA15bhzeKAbolG0/ZE\nNVlAzbPR0LzpBLxUzdybTZQYUX129zz7k67d+C9viPeb3AJHT1vKQAk1+xIKWHWo\npERyDqaXaFFak7A9Lc/K2Kb7fwKBgQDCXZvNcT0DXk3+VHZlrUUkYSDFXLWqlvcD\nCB/8RWaqvVRBkB2Zz7P+Nh3b4OLHNaRDdSumdBs51Prl+q4joBFYd9c5im8sXone\n9+p0XwwQoyUBawATPKzXPVjhumlgVxqjhHca0kTTG/h8sWLxpSWQJyEuUdXogI4C\n5U4oUQhHVwKBgE5qb1IRSB2/Wxy61ltC2qG4krx4AxhYAOSms2V2Ds4qDp+5iVD/\niTl/WgT1J7sFQ0jbCCCU7WLQx+Jt8ulPM0H7K8/iWs3jtyIABsyAMx7rRBxzg1UP\nFUOGnnULUAVgYNo5YQy8mGbqss1plAfyP1gy+ak0cNHBChLH+u2m3XAjAoGAeYMk\nQJAm4NA4WmRbkL1+mHvQjRKk0H2I9/BAburEgMHUxxheKSbdFHSovioeHQTAKRw7\nqdi0nLc2FElgTQ1pSrHBcEvHrSl9cFP108MIO+6C2BwY8+3e8MF9q8Fq17wc/1V1\nUONb+89kzi/n98KTdUfBSsAGx1B3d//7mODwGAkCgYBjW/oikcAmrDEaYrV+3BjP\nVU3S2bHnrCvZ+tAn2MT5NFlj6rRuGOiZq6W2bRx/iJyIElVEhk9lzW7a2uHTAmf8\n7mGgO0HvJZLpC15/fjTPXCq5KUny1wiv0yYWqY4fg6qALapVsHufUuG7IZifVHrE\nwqYsPuTspbc3PgxmF370FQ==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-cuhva@bird-iot.iam.gserviceaccount.com",
        "client_id": "106097385555888914992",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-cuhva%40bird-iot.iam.gserviceaccount.com"
    }),
    databaseURL: "https://bird-iot.firebaseio.com"
})


const app = express()

app.use(express.json())

app.get('/', async(req, res) => {
    const d = await home()
    res.json({data: d})
})

app.get('/search/:keyword', async(req, res) => {
    const {keyword} = req.params
    const d = await search(keyword)
    res.json({ total:  d.length, data: d})
})

app.get('/category/:domain', async(req, res) => {
    const {domain} = req.params
    const d = await category(domain)
    res.json({data: d})
    
})

app.post('/api', async(req, res) => {
    const {url} = req.body
    const data = await api(url)
    res.json({data})
})


app.get('/bird', async(req, res) => {
    const d = fire.firestore()
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const month = months[new Date().getMonth()]
    const da = d.collection('bird')
    const s = await da.doc(month).get()
    const data = s.data()
    const keys = Object.keys(data)
    const c = await da.doc(month).update({
        [keys.length]: {
            timestamp: Date.now(),
            date: `${new Date().getDate()}`.padStart(2, '0') + '/' + `${new Date().getMonth() + 1}`.padStart(2, '0') + '/' + new Date().getFullYear(),
        }
    })
    
    res.json({data:data})
})
const PORT = 5000
app.listen( process.env.PORT || PORT, console.log(`Server running on port ${process.env.PORT || PORT}`))
