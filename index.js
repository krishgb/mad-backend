import express from 'express'
import { search, category } from './controllers/index.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {res.send('Hello')})
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

const PORT = 5000
app.listen(PORT, console.log(`Server running on port ${PORT}`))
