import { gql } from 'graphql-tag'

export const conferenceItems = gql`
query conferenceItems($filter: ConferenceItemFilterInput, $page: PageInput) {
    conferenceItems(filter: $filter, page: $page) {
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
                ...ConferenceFolderBreadcrumbs
                childFolders {
                    ...ConferenceFolderBreadcrumbs
                    childFolders {
                        ...ConferenceFolderBreadcrumbs
                        childFolders {
                            ...ConferenceFolderBreadcrumbs
                            childFolders {
                                ...ConferenceFolderBreadcrumbs
                            }
                        }
                    }
                }
            }
        }
        
    }
}

fragment ConferenceFolderBreadcrumbs on ConferenceItemType {
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

export const conferenceFolderTree = gql`
query conferenceFolderTree($projectId: Int, $filter: ConferenceFolderTreeFilter) {
    conferenceFolderTree (projectId: $projectId, filter: $filter) {
        folders {
            ...FolderFragment
            childFolders {
                ...FolderFragment
                childFolders {
                    ...FolderFragment
                    childFolders {
                        ...FolderFragment
                        childFolders {
                            ...FolderFragment
                            childFolders {
                                ...FolderFragment
                                childFolders {
                                    ...FolderFragment
                                    childFolders {
                                        ...FolderFragment
                                        childFolders {
                                            ...FolderFragment
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

fragment FolderFragment on FolderType {
    id
    name
    hasChild
} 
`
