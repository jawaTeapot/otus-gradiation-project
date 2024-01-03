import { gql } from 'graphql-tag'

export const entitySettingsSettingsUpdate = gql`
mutation entitySettingsSettingsUpdate($input: EntitySettingsSettingsUpdateInput) {
    entitySettingsSettingsUpdate(input: $input) {
        title
        description
        startAt
        timezone
        isAuto
        showRecords
        src
        timeout
        lobby
    }
}
`

export const entitySettingsRestreamingAdd = gql`
mutation entitySettingsRestreamingAdd($input: EntitySettingsRestreamingAddInput) {
    entitySettingsRestreamingAdd(input: $input) {
        restreamingList {
            id
            isActive
            targetKey
            targetLogin
            targetPassword
            targetServer
        }
    }
}
`

export const entitySettingsRestreamingIsActive = gql`
mutation entitySettingsRestreamingIsActive($input: EntitySettingsRestreamingIsActiveInput) {
    entitySettingsRestreamingIsActive (input: $input) {
        response
    }
}
`

export const entitySettingsRestreamingUpdate = gql`
mutation entitySettingsRestreamingUpdate($input: EntitySettingsRestreamingUpdateInput) {
    entitySettingsRestreamingUpdate(input: $input) {
        restreamingList {
            id
            isActive
            targetKey
            targetLogin
            targetPassword
            targetServer
        }
    }
}
`

export const entitySettingsRestreamingDelete = gql`
mutation entitySettingsRestreamingDelete($input: EntitySettingsRestreamingDeleteInput) {
    entitySettingsRestreamingDelete (input: $input) {
        restreamingList {
            id
            isActive
            targetKey
            targetLogin
            targetPassword
            targetServer
        }
    }
}
`

export const entitySettingsInformationUpdate = gql`
mutation entitySettingsInformationUpdate($input: EntitySettingsInformationUpdateInput) {
    entitySettingsInformationUpdate (input: $input) {
        title
        description
        isPublicLink
        publicInviteLink
    }
}
`

export const entitySettingsEntityTitleUpdate = gql`
    mutation entitySettingsEntityTitleUpdate($input: EntitySettingsEntityTitleUpdateInput){
        entitySettingsEntityTitleUpdate(input: $input) {
            title
        }
    }
`

export const entitySettingsDeleteVideo = gql`
mutation entitySettingsDeleteVideo($projectId: Int, $input: EntitySettingsDeleteVideoInput) {
    entitySettingsDeleteVideo(projectId: $projectId, input: $input) {
        records {
            recordList {
                itemType
                id
                duration
                parentFolderId
                code
                added
                name
                videoQuality(projectId: $projectId) {
                    quality
                    qualityStatus
                }
                poster {
                    id
                    url
                }
            }
        }
    }
}
`

export const entitySettingsChatUpdate = gql`
mutation entitySettingsChatUpdate($input: EntitySettingsChatInput) {
    entitySettingsChatUpdate(input: $input) {
        isEnabled
        lastRows
        defaultMessage
        saveNickname
        ownerNickname
        showUsers
    }
}
`
export const entitySettingsAddParticipant = gql`
mutation entitySettingsAddParticipant($input: EntitySettingsAddParticipantInput, $page: PageInput) {
    entitySettingsAddParticipant(input: $input, page: $page) {
        totalElements
        pageCount
        participants {
            id
            email
            name
            added
            role
            inviteUrl
            notified
            avatarUrl
        } 
    }
}
`

export const entitySettingsInviteParticipant = gql`
mutation entitySettingsInviteParticipant($input: EntitySettingsInviteParticipantInput) {
    entitySettingsInviteParticipant(input: $input) {
        response
    }
}
`
export const entitySettingsInviteParticipantsAgain = gql`
mutation entitySettingsInviteParticipantsAgain($input: EntitySettingsInviteParticipantAgainInput) {
    entitySettingsInviteParticipantsAgain(input: $input) {
        response
    }
}
`

export const entitySettingsParticipantDelete = gql`
mutation entitySettingsParticipantDelete($input: EntitySettingsParticipantDeleteInput, $page: PageInput) {
    entitySettingsParticipantDelete(input: $input, page: $page) {
        totalElements
        pageCount
        participants {
            id
            email
            name
            added
            role
            inviteUrl
            notified
            avatarUrl
        } 
    }
}
`

export const entitySettingsParticipantUpdate = gql`
mutation entitySettingsParticipantUpdate($input: EntitySettingsParticipantUpdateInput, $page: PageInput) {
    entitySettingsParticipantUpdate(input: $input, page: $page) {
        totalElements
        pageCount
        participants {
            id
            email
            name
            added
            role
            inviteUrl
            notified
            avatarUrl
        } 
    }
}
`

export const entitySettingsDeleteParticipantAvatar = gql`
mutation entitySettingsDeleteParticipantAvatar($input: EntitySettingsDeleteParticipantAvatarInput) {
    entitySettingsDeleteParticipantAvatar(input: $input) {
        response
    }
}
`
