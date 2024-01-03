import { gql } from 'graphql-tag'

export const tariffs = gql`
    query tariffs(
        $currency: String
        $filter: TariffFilterInput
        $page: PageInput
    ) {
        tariffs(filter: $filter, page: $page) {
            totalCount
            nodes {
                id
                title
                isDef
                isPublic
                position
                prices(currency: $currency) {
                    currency
                    price
                }
            }
        }
    }
`
