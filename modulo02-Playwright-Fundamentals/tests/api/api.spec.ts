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
        const response = await request.get(`${baseUrl}/users/1`)
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
        //console.log(responseBody)
    })

    test("GET Request - Get User Detail", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/1`)
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(1)
        expect(responseBody.data.first_name).toEqual('George')
        expect(responseBody.data.last_name).toBe('Bluth')
        expect(responseBody.data.email).toBeTruthy()
        //console.log(responseBody)
    })

    test("POST Request - Create New User", async ({ request }) => {
        const response = await request.post(`${baseUrl}/users`, { 
            data: {
                id: 1000,
            }
        })

        const responseBody = JSON.parse(await response.text())
        expect(responseBody.id).toBe(1000)
        expect(responseBody.createdAt).toBeTruthy()
    })
})