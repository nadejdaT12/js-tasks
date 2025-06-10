// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { faker } from '@faker-js/faker';
Cypress.Commands.add('sentRequest',(endpoint, method, body=null) =>{
    cy.request({
        url: endpoint,
        method: method,
        headers: {
            'Authorization': 'pk_200589300_JCKLZL75NT02BXJ5IT3H76WVZJO0Q892',
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
        body: body
    })
})
Cypress.Commands.add('createTask',() =>{
    cy.sentRequest('list/901511896594/task', 'POST', {"name": faker.internet.username()})

})
Cypress.Commands.add('getTasks',() =>{
    cy.sentRequest('list/901511896594/task', 'GET')

})
Cypress.Commands.add('updateTask',() => {
    cy.createTask()
        .then((response) => {
            cy.wrap(response.body.id).as('taskId')
        })
    cy.get('@taskId').then((id) => {
        cy.sentRequest('task/' + id, 'PUT', {"name": faker.internet.username()})
            .then((response) => {
                expect(response.status).to.eq(200)
            })
        cy.sentRequest('task/' + id, 'GET')
            .then((response) => {
                cy.log(response.duration)
            })
        cy.sentRequest('task/' + id, 'DELETE')
    })
})
Cypress.Commands.add('sentRequest_false',(endpoint, method, body=null) =>{
    cy.request({
        url: endpoint,
        method: method,
        headers: {
            'Authorization': 'pk_194692916_P3F3I9XQZ8DRL',
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
        body: body
    })
})