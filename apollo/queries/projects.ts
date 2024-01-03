import { gql } from 'graphql-tag'

export const userProjects = gql`
  query userProjects ($filter: UserProjectFilterInput, $page: PageInput) {
      userProjects (filter: $filter, page: $page) {
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

export const userProjectSettings = gql`
query userProjectSettings($projectId: Int!) {
    userProjectSettings(projectId: $projectId) {
        id
        integration {
            apiKey
            apiKeyFtp
            code
            downloadFromComputer
            downloadByLink
            autoBroadcasting
            timepadNotifaication
            domain
            apiKeyList(projectId: $projectId) {
                id
                apiKey
                allowType
                name
                added
            }
        }
        protection {
            useDirectLink
            isEncrypt
            security
            userAgentAllow
            userAgentDeny
            deniedEmptyReferrer
            timeValid
            domains(projectId: $projectId) {
                domainList
            }
        }
        targeting {
            useTargeting
            showUnknown
            countries(projectId: $projectId) {
                iso
                countryList {
                    id
                    iso
                    isSelected
                }
            }
        }
        skin {
            skinType
        }
        page {
            usePage
            indexPage
            siteName
            slogan
            image {
                name
                url
            }
            useShare
            useLikes
            useDownload
            useComments
            commentsType
            commentsId
            useGoogle
            googleCode
        }
        branding {
            playerLogo(projectId: $projectId) {
                playerLogoImage {
                    name
                    url
                }
                usePlayerLogo
                playerLogoUrl
                playerLogoPosition
                playerLogoMargin
            }
            playButton(projectId: $projectId) {
                playButtonImage {
                    name
                    url
                }
                usePlayButton
            }
            ppvLogo(projectId: $projectId) {
                playerPpvImage {
                    name
                    url
                }
                usePpvLogo
            }
            emailPattern(projectId: $projectId) {
                useEmailLogo
                emailLogoImage {
                    name
                    url
                }
                emailLogoBg
                removeBoomstreamContact
                emailSubjectString
                logoDescription
                emailDescriptionColor
            }
            smtpSettings(projectId: $projectId) {
                useCustomEmails
                smtpHost
                smtpPort
                login
                password
                email
                senderName
                encryptionType
                isVerified
            }
            domainParking(projectId: $projectId) {
                useDomain
                domain
                redirectUrl
                protocol
                domainNextCheck
                domainStatus
                domainIsExist
            }
            analyticsCounter(projectId: $projectId) {
                useGoogleAnalytics
                googleAnalyticsCode
                useYandexMetrika
                yandexMetrikaCode
                useFacebookPixel
                facebookPixelCode
            }
        }
        webhook {
            webhookNameList
            webhookList {
                id
                name
                url
                createdAt
                status
            }
        }
    }
}
`
