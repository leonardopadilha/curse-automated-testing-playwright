const playwright = require('playwright')
const random_useragent = require('random-useragent')
const fs = require('fs')

const BASE_URL="https://github.com/topics/playwright"

;(async () => {
    // Create Random Agent
    const agent = random_useragent.getRandom()

    //Setup Browser
    const browser = await playwright.chromium.launch({ headless: true })
    const context = await browser.newContext({ userAgent: agent })
    const page = await context.newPage({ bypassCSP: true })
    await page.setDefaultTimeout(30000)
    await page.setViewportSize({ width: 800, height: 600 })
    await page.goto(BASE_URL)

    // Get Data from Website
    const repositories = await page.$$eval('article.border', (repoCards) => {
        return repoCards.map((card) => {
            const [user, repo] = card.querySelectorAll('h3 a')

            const formatText = (element) => element && element.innerText.trim()

            return {
                user: formatText(user),
                repo: formatText(repo),
                url: repo.href,
            }
        })
    })

    console.log(repositories)

    // Store Data into File
    const logger = fs.createWriteStream('data.json', { flag: 'w' })
    //logger.write(JSON.stringify(repositories)) //sem formatação
    logger.write(JSON.stringify(repositories, null, ' ')) // Json formatado

    // Close browser
    await browser.close()

}) ().catch(error => {
    console.log(error)
    process.exit(1)
})

// npm install random-useragent
// npm install playwright prettier