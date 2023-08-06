import { test, expect } from "@playwright/test"

test.describe.parallel("API Testing", () => {
    const baseUrl = "https://reqres.in/api"

    test("Simple API Test - Assert Response Status", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/2`)
        expect(response.status()).toBe(200)
    })

    test("Simple API Test - Assert Invalid Endpoint", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/non-existing-endpoint`)
        expect(response.status()).toBe(404)
    })

    test("Simple API Test with JSON data - Assert Response Status", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/2`)
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)
    })
})