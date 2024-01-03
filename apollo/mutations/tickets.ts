import { gql } from 'graphql-tag'

export const ticketCreate = gql`
mutation ticketCreate ($input: TicketCreateInput) {
    ticketCreate (input: $input) {
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

export const ticketMessageCreate = gql`
mutation ticketMessageCreate ($input: TicketMessageCreateInput) {
    ticketMessageCreate (input: $input) {
        ticketId
        messageCount
        ticketMessages {
            id
            author
            message
            added
        }
    }
}
`

export const ticketClose = gql`
mutation ticketClose ($input: TicketCloseInput) {
    ticketClose (input: $input) {
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
