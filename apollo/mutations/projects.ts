import { gql } from 'graphql-tag'

export const userProjectCreate = gql`
    mutation userProjectCreate ($input: UserProjectCreateInput) {
    userProjectCreate (input: $input) {
        record {
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
export const userProjectDeleted = gql`
  mutation userProjectDelete($input: UserProjectDeleteInput) {
    userProjectDelete(input: $input) {
        response
    }
  }
`

export const userProjectActivateBranding = gql`
  mutation userProjectActivateBranding ($input: UserProjectBrandingInput) {
    userProjectActivateBranding (input: $input) {
        response
    }
  }
`

export const userProjectActivateDRM = gql`
  mutation userProjectActivateDRM ($input: UserProjectActivateDRMInput) {
    userProjectActivateDRM (input: $input) {
        response
    }
  }
`

export const userProjectChangeTitle = gql`
  mutation userProjectChangeTitle($input: UserProjectChangeTitleInput) {
    userProjectChangeTitle(input: $input){
        title
    }
  }
`

export const userProjectGenerateAPIKey = gql`
mutation userProjectGenerateAPIKey($projectId: Int!) {
    userProjectGenerateAPIKey(projectId: $projectId) {
        apiKey
    }
}
`
export const userProjectAddApiKey = gql`
mutation userProjectAddApiKey($projectId: Int!, $input: UserProjectAddApiKeyInput) {
    userProjectAddApiKey (projectId: $projectId, input: $input) {
            apiKeyList {
                id
                apiKey
                allowType
                name
                added
            }
    }
}
`

export const userProjectDeleteApiKey = gql`
mutation userProjectDeleteApiKey($projectId: Int!, $input: UserProjectDeleteApiKeyInput) {
    userProjectDeleteApiKey (projectId: $projectId, input: $input) {
           response
    }
}
`

export const userProjectGenerateAPIKeyFtp = gql`
mutation userProjectGenerateAPIKeyFtp($projectId: Int!) {
    userProjectGenerateAPIKeyFtp(projectId: $projectId) {
        apiKeyFtp
    }
}
`

export const usrProjectGenerateCode = gql`
mutation usrProjectGenerateCode($projectId: Int!) {
    usrProjectGenerateCode(projectId: $projectId) {
        code
    }
}
`

export const userProjectIntegrationUpdate = gql`
mutation userProjectIntegrationUpdate($projectId: Int!, $input: UserProjectIntegrationInput) {
    userProjectIntegrationUpdate (projectId: $projectId, input: $input) {
        apiKey
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
                added
            }
    }
}
`

export const userProjectProtectionUpdate = gql`
mutation userProjectProtectionUpdate($projectId: Int!, $input: UserProjectProtectionInput) {
    userProjectProtectionUpdate (projectId: $projectId, input: $input) {
            response
    }
}
`

export const userProjectRestreamingProtectionDisable = gql`
mutation userProjectRestreamingProtectionDisable($projectId: Int!, $input: UserProjectRestreamingProtectionDisableInput) {
    userProjectRestreamingProtectionDisable (projectId: $projectId, input: $input) {
            userAgentAllow
            userAgentDeny
    }
}
`

export const userProjectRestreamingProtectionByDomain = gql`
mutation userProjectRestreamingProtectionByDomain($projectId: Int!, $input: UserProjectRestreamingProtectionByDomainInput) {
    userProjectRestreamingProtectionByDomain (projectId: $projectId, input: $input) {
            userAgentAllow
            userAgentDeny
            deniedEmptyReferrer
            domains(projectId: $projectId) {
                domainList
            }
    }
}
`

export const userProjectRestreamingProtectionByIp = gql`
mutation userProjectRestreamingProtectionByIp($projectId: Int!, $input: UserProjectRestreamingProtectionByIpInput) {
    userProjectRestreamingProtectionByIp (projectId: $projectId, input: $input) {
            userAgentAllow
            userAgentDeny
    }
}
`

export const userProjectRestreamingProtectionByTime = gql`
mutation userProjectRestreamingProtectionByTime($projectId: Int!, $input: UserProjectRestreamingProtectionByTimeInput) {
    userProjectRestreamingProtectionByTime (projectId: $projectId, input: $input) {
            userAgentAllow
            userAgentDeny
            timeValid
    }
}
`

export const userProjectTargetingUpdate = gql`
mutation userProjectTargetingUpdate($projectId: Int!, $input: UserProjectTargetingInput) {
    userProjectTargetingUpdate (projectId: $projectId, input: $input) {
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
}
`

export const userProjectSkinUpdate = gql`
mutation userProjectSkinUpdate($projectId: Int!, $input: UserProjectSkinInput) {
    userProjectSkinUpdate (projectId: $projectId, input: $input) {
            skinType
    }
}
`

export const userProjectPageUpdate = gql`
mutation userProjectPageUpdate($projectId: Int!, $input: UserProjectPageInput) {
    userProjectPageUpdate (projectId: $projectId, input: $input) {
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
}
`

export const userProjectPlayerLogoUpdate = gql`
mutation userProjectPlayerLogoUpdate($projectId: Int!, $input: UserProjectPlayerLogoInput) {
    userProjectPlayerLogoUpdate(projectId: $projectId, input: $input) {
        playerLogoImage {
            name
            url
        }
        usePlayerLogo
        playerLogoUrl
        playerLogoPosition
        playerLogoMargin
    }
}
`

export const userProjectEmailPatternUpdate = gql`
mutation userProjectEmailPatternUpdate($projectId: Int!, $input: UserProjectEmailPatternInput) {
    userProjectEmailPatternUpdate (projectId: $projectId, input: $input) {
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
}
`

export const userProjectSmtpSettingsUpdate = gql`
mutation userProjectSmtpSettingsUpdate($projectId: Int!, $input: UserProjectSmtpSettingsInput) {
    userProjectSmtpSettingsUpdate (projectId: $projectId, input: $input) {
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
}
`

export const userProjectTestCustomEmail = gql`
mutation userProjectTestCustomEmail($projectId: Int!) {
    userProjectTestCustomEmail(projectId: $projectId) {
        response
    }
}
`

export const userProjectSettingsEmailIsVerified = gql`
query userProjectSettingsEmailIsVerified($projectId: Int!) {
    userProjectSettingsEmailIsVerified(projectId: $projectId) {
        isVerified
    }
}
`

export const userProjectDomainParkingUpdate = gql`
mutation userProjectDomainParkingUpdate($projectId: Int!, $input: UserProjectDomainParkingInput) {
    userProjectDomainParkingUpdate(projectId: $projectId, input: $input) {
                useDomain
                domain
                redirectUrl
                protocol
                domainStatus
                domainNextCheck
                domainIsExist
    }
}
`

export const userProjectSettingsCheckDomainStatus = gql`
mutation userProjectSettingsCheckDomainStatus($projectId: Int!) {
    userProjectSettingsCheckDomainStatus(projectId: $projectId) {
        domainStatus
        protocol
    }
}
`

export const userProjectAnalyticsCounterUpdate = gql`
mutation userProjectAnalyticsCounterUpdate($projectId: Int!, $input: UserProjectAnalyticsCounterInput) {
    userProjectAnalyticsCounterUpdate (projectId: $projectId, input: $input) {
                useGoogleAnalytics
                googleAnalyticsCode
                useYandexMetrika
                yandexMetrikaCode
                useFacebookPixel
                facebookPixelCode
    }
}
`

export const userProjectWebhookCreate = gql`
mutation userProjectWebhookCreate($projectId: Int!, $input: UserProjectWebhookCreateInput) {
  userProjectWebhookCreate (projectId: $projectId, input: $input) {
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
`

export const userProjectWebhookDelete = gql`
mutation userProjectWebhookDelete($projectId: Int!, $input: UserProjectWebhookDeleteInput) {
  userProjectWebhookDelete (projectId: $projectId, input: $input) {
    webhookList {
     id
     name
     url
     createdAt
     status
    }
  }
}
`
export const userProjectPageLogoDelete = gql`
mutation userProjectPageLogoDelete($projectId: Int!) {
    userProjectPageLogoDelete(projectId: $projectId) {
        logo
    }
}
`

export const userProjectPlayButtonDelete = gql`
mutation userProjectPlayButtonDelete($projectId: Int!) {
    userProjectPlayButtonDelete(projectId: $projectId) {
        logo
    }
}
`

export const userProjectPpvLogoDelete = gql`
mutation userProjectPpvLogoDelete($projectId: Int!) {
    userProjectPpvLogoDelete(projectId: $projectId) {
        logo
    }
}
`

export const userProjectPlayerLogoDelete = gql`
mutation userProjectPlayerLogoDelete($projectId: Int!) {
    userProjectPlayerLogoDelete(projectId: $projectId) {
        logo
    }
}
`
export const userProjectEmailLogoDelete = gql`
mutation userProjectEmailLogoDelete($projectId: Int!) {
    userProjectEmailLogoDelete(projectId: $projectId) {
        logo
    }
}
`
