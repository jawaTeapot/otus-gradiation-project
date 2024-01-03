import { gql } from 'graphql-tag'

export const tickets = gql`
  query tickets {
      tickets {
          ticketList {
              id
              title
              messageCount
              status
              updated
          }
      }
  }
`
export const ticketView = gql`
query ticketView ($filter: TicketViewFilterInput) {
    ticketView (filter: $filter) {
        ticketId
        ticketMessages {
            id
            author
            message
            added
        }
    }
}
`
