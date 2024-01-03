import { gql } from 'graphql-tag'

export const conferenceCreate = gql`
mutation conferenceCreate ($projectId: Int!, $input: ConferenceCreateInput, $page: PageInput) {
    conferenceCreate (projectId: $projectId, input: $input, page: $page) {
        breadcrumbs {
            id
            title
        }
        folderTitle
        totalElements
        pageCount
        conferenceCount(projectId: $projectId)
        records {
            itemType
            id
            parentFolderId
            code
            status
            records
            startAt
            timeout
            lobby
            audiencesOnline
            added
            name
            poster {
                id
                url
            }
            playlists
            hasChild
            childFolders {
                ...ConferenceBreadcrumbs
                childFolders {
                    ...ConferenceBreadcrumbs
                    childFolders {
                        ...ConferenceBreadcrumbs
                        childFolders {
                            ...ConferenceBreadcrumbs
                            childFolders {
                                ...ConferenceBreadcrumbs
                            }
                        }
                    }
                }
            }
        }
    }
}

fragment ConferenceBreadcrumbs on ConferenceItemType {
    itemType
        id
        parentFolderId
        code
        status
        records
        audiencesOnline
        added
        name
        hasChild
        poster {
            id
            url
        }
} 
`

export const conferenceFolderCreate = gql`
mutation conferenceFolderCreate ($input: ConferenceFolderCreateInput, $page: PageInput) {
    conferenceFolderCreate (input: $input, page: $page) {
        breadcrumbs {
            id
            title
        }
        folderTitle
        totalElements
        pageCount
        records {
            itemType
            id
            parentFolderId
            code
            status
            records
            audiencesOnline
            added
            name
            hasChild
            poster {
                id
                url
            }
            playlists
            childFolders {
                ...ConferenceBreadcrumbs
                childFolders {
                    ...ConferenceBreadcrumbs
                    childFolders {
                        ...ConferenceBreadcrumbs
                        childFolders {
                            ...ConferenceBreadcrumbs
                            childFolders {
                                ...ConferenceBreadcrumbs
                            }
                        }
                    }
                }
            }
        }
    }
}

fragment ConferenceBreadcrumbs on ConferenceItemType {
    itemType
        id
        parentFolderId
        code
        status
        records
        audiencesOnline
        added
        name
        hasChild
        poster {
            id
            url
        }
} 
`

export const conferenceItemDelete = gql`
mutation conferenceItemDelete($projectId: Int!, $input: ConferenceItemDeleteInput, $page: PageInput) {
    conferenceItemDelete(projectId: $projectId, input: $input, page: $page) {
        breadcrumbs {
            id
            title
        }
        folderTitle
        totalElements
        pageCount
        conferenceCount(projectId: $projectId)
        records {
            itemType
            id
            parentFolderId
            code
            status
            records
            audiencesOnline
            added
            name
            hasChild
            poster {
                id
                url
            }
            playlists
            childFolders {
                ...ConferenceBreadcrumbs
                childFolders {
                    ...ConferenceBreadcrumbs
                    childFolders {
                        ...ConferenceBreadcrumbs
                        childFolders {
                            ...ConferenceBreadcrumbs
                            childFolders {
                                ...ConferenceBreadcrumbs
                            }
                        }
                    }
                }
            }
        }
    }
}
fragment ConferenceBreadcrumbs on ConferenceItemType {
    itemType
        id
        parentFolderId
        code
        status
        records
        audiencesOnline
        added
        name
        hasChild
        poster {
            id
            url
        }
}
`

export const conferenceRenameFolderTitle = gql`
mutation conferenceRenameFolderTitle($projectId: Int!, $input: ConferenceRenameFolderTitleInput, $page: PageInput) {
    conferenceRenameFolderTitle(projectId: $projectId, input: $input, page: $page) {
        breadcrumbs {
            id
            title
        }
        folderTitle
        totalElements
        pageCount
        records {
            itemType
            id
            parentFolderId
            code
            status
            records
            startAt
            timeout
            lobby
            audiencesOnline
            added
            name
            poster {
                id
                url
            }
            playlists
            hasChild
            childFolders {
                ...ConferenceBreadcrumbs
                childFolders {
                    ...ConferenceBreadcrumbs
                    childFolders {
                        ...ConferenceBreadcrumbs
                        childFolders {
                            ...ConferenceBreadcrumbs
                            childFolders {
                                ...ConferenceBreadcrumbs
                            }
                        }
                    }
                }
            }
        }
    }
}

fragment ConferenceBreadcrumbs on ConferenceItemType {
    itemType
    id
    parentFolderId
    code
    status
    records
    audiencesOnline
    added
    name
    hasChild
    poster {
        id
        url
    }
} 
`

export const conferenceMoveToAnotherFolderOrApplication = gql`
mutation conferenceMoveToAnotherFolderOrApplication($projectId: Int!, $input: ConferenceMoveToAnotherFolderOrApplicationInput, $page: PageInput) {
    conferenceMoveToAnotherFolderOrApplication(projectId: $projectId, input: $input, page: $page) {
         breadcrumbs {
            id
            title
        }
        folderTitle
        totalElements
        pageCount
        conferenceCount(projectId: $projectId)
        records {
            itemType
            id
            parentFolderId
            code
            status
            records
            startAt
            timeout
            lobby
            audiencesOnline
            added
            name
            poster {
                id
                url
            }
            playlists
            hasChild
            childFolders {
                ...ConferenceBreadcrumbs
                childFolders {
                    ...ConferenceBreadcrumbs
                    childFolders {
                        ...ConferenceBreadcrumbs
                        childFolders {
                            ...ConferenceBreadcrumbs
                            childFolders {
                                ...ConferenceBreadcrumbs
                            }
                        }
                    }
                }
            }
        }
    }
}

fragment ConferenceBreadcrumbs on ConferenceItemType {
    itemType
    id
    parentFolderId
    code
    status
    records
    audiencesOnline
    added
    name
    hasChild
    poster {
        id
        url
    }
} 
`
