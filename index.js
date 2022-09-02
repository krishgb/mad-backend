import express from 'express'
import { search, category, home, api } from './controllers/index.js'

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
const PORT = 5000
app.listen( process.env.PORT || PORT, console.log(`Server running on port ${process.env.PORT || PORT}`))
