import { faker } from '@faker-js/faker';
describe('Test goals on clickup', () => {
  it('Should sent Get_Tasks_simple request and return 200', () => {
    //url, method, header, body
    cy.sentRequest('list/901511896594/task', 'GET')
        .then((response) => {
          expect(response.status).to.eq(200)
        })
  })
  it('Should sent PUT request and return 200', () => {
    cy.updateTask()
        .then((response) => {
          expect(response.status).to.eql(204)
        })
  })
  it('Should sent POST request and return 200', () => {
    cy.createTask()
        .then((response) => {
          cy.log(response.duration)
          expect(response.status).to.eq(200)
          cy.wrap(response.body.id).as('taskId')
        })
    cy.get('@taskId').then((id) => {
      cy.sentRequest('task/' + id, 'GET')
          .then((response) => {
            expect(response.status).to.eq(200)
          })

      cy.sentRequest('task/' + id, 'DELETE')
          .then((response) => {
            expect(response.status).to.eql(204)
          })
    })
  })
   it('Should sent GET_TASKS request and return 200', () => {
        cy.createTask()
            .then((response) => {
                cy.wrap(response.body.id).as('taskId_1')
            })
        cy.createTask()
            .then((response) => {
                cy.wrap(response.body.id).as('taskId_2')
            })
        cy.getTasks()
            .then((response) => {
                expect(response.status).to.eq(200)
            })
        cy.get('@taskId_1').then((id) => {
            cy.sentRequest('task/' + id, 'DELETE')
                .then((response) => {
                    expect(response.status).to.eql(204)
                })
            cy.get('@taskId_2').then((id) => {
                cy.sentRequest('task/' + id, 'DELETE')
                    .then((response) => {
                        expect(response.status).to.eql(204)
                    })
            })
        })
    })
  it('Should sent POST request and return 401', () => {
      cy.sentRequest_false('list/901511896594/task', 'POST', {"name": faker.internet.username()})
          .then((response) => {
              expect(response.status).to.eq(401)
          })
  })
  it('Should sent POST request without body and return 400', () => {
      cy.request({
              url: 'https://api.clickup.com/api/v2/list/901511896594/task',
              method: 'POST',
              headers: {
                  'Authorization': 'pk_200589300_JCKLZL75NT02BXJ5IT3H76WVZJO0Q892',
                  'Content-Type': 'application/json'
              },
          failOnStatusCode: false
          }).then((response) => {
              expect(response.status).to.eq(400)
          })
      })
    it('Should sent POST request without the correct list_id and return 400', () => {
        cy.request({
            url: 'https://api.clickup.com/api/v2/list/9015118965946666/task',
            method: 'POST',
            headers: {
                'Authorization': 'pk_200589300_JCKLZL75NT02BXJ5IT3H76WVZJO0Q892',
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false,
            body: {"name": faker.internet.username()}
        }).then((response) => {
            expect(response.status).to.eq(401)
        })
    })

})
