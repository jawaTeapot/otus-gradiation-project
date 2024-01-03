import { gql } from 'graphql-tag'

export const entitySettings = gql`
query entitySettings($projectId: Int, $filter: EntitySettingsInputFilter) {
    entitySettings(projectId: $projectId, filter: $filter) {
        title
        projectId
        entityId
        entityType
        entityPoster {
            id
            url
        }
        information {
            code
            added
            isPublicLink
            publicInviteLink
        }
        settings {
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
        restreaming {
            restreamingList {
                id
                isActive
                targetKey
                targetLogin
                targetPassword
                targetServer
            }
        }
        access(projectId: $projectId) {
            subscriptions {
                id
                title
                isAttached
            }
        }
        chat {
            isEnabled
            lastRows
            defaultMessage
            saveNickname
            ownerNickname
            showUsers
            chatHistory {
                name
                message
                date
            }
        }
        participant {
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

export const entitySettingsSearchParticipant = gql`
query entitySettingsSearchParticipant($filter: EntitySettingsSearchParticipantFilter, $page: PageInput) {
    entitySettingsSearchParticipant(filter: $filter, page: $page) {
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

export const entitySettingsGetAllParticipants = gql`
query entitySettingsGetAllParticipants($filter: EntitySettingsGetAllParticipantFilter, $page: PageInput) {
    entitySettingsGetAllParticipants(filter: $filter, page: $page) {
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
