import { gql } from 'graphql-tag'

export const loginProfile = gql`
  query allData($code: String, $tariffsFilter: TariffFilterInput) {
    loginProfile {
      id
      email
      username
      isEmailVerified
      emailSettings {
        email
        useBothEmails
        balance
        balanceLimit
        mediaSuccess
        mediaError
        mediaBuy
        liveCodecs
        cameraError
        liveAutokick
        liveNotRecorded
        news
      }
      account {
        balance
        balanceLine
        currency
        creditEnabled
        removeMediaAt
      }
      stat {
        playtimeMs
        timesSpaceMs
      }
      settings {
        phone
        about
        language {
          id
          title
          code
        }
      }
      createdAt
    }
    checkMyPromoCode(code: $code) {
      isAvailable
      promo {
        id
        title
        bonus
      }
    }
    tariffs(filter: $tariffsFilter) {
      nodes {
        id
        title
        isDef
        isPublic
        position
        prices {
          currency
          price
        }
      }
    }
    userProjects {
      totalCount
      nodes {
        id
        title
        hasDrm
        hasBranding
        stat {
          vodCount
          liveCount
          materialsCount
          playlistCount
          subscriptionCount
          passwordCount
          collectionCount
          conferenceCount
        }
      }
    }
  }
`
