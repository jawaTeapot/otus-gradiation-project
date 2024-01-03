import { gql } from 'graphql-tag'

export const userFinances = gql`
query userFinances {
    userFinances {
        accountDetails {
            detailsType
            name
            email
            phone
            address
            street
            zip
            home
            inn
            kpp
            title
            legalAddress
            bic
            ogrn
            currentAccount
            bankName
            director
            contact
            fax
            declaration
            authority
            site
            placeRegistration
            birthday
            birthplace
            passport
            passportDate
            snils
            nationality
            selfEmployedNumber
        }
        transactions {
            transactionList {
                date
                totalDeposit
                totalExpenses
                balance
                logs {
                    date
                    type
                    cause
                    tariff
                    number
                    subtotal
                    amountMinus
                    amountPlus
                    balance 
                }
            }
        }
        gateways {
            gatewayList {
                gatewayId
                name
            }
        }
        withdrawal {
            currency
            amount
            serviceAmount
            withdrawalAvailable
            commission
            commissionAmount
        }
        referrals {
            useAffiliateProgram
            referralUrl
            referralsCount
            name
        }
        tariffs {
            currentTariff
            tariffStorage
            tariffVod
            tariffBroadcasting
            tariffLive
        }
        documents {
            bills {
                billList {
                    transactionId
                    status
                    gateway
                    amount
                    date
                } 
            }
        }
    }
}
`
