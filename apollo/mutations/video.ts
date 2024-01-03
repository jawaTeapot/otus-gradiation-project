import { gql } from 'graphql-tag'

export const mediaCreateFolder = gql`
mutation mediaCreateFolder($projectId: Int!, $permission: UserPermission, $mediaType: MediaType, $input: MediaCreateFolderInput, $page: PageInput={}) {
    mediaCreateFolder(projectId: $projectId, permission: $permission, mediaType: $mediaType, input: $input, page: $page) {
        breadcrumbs {
            id
            title
        }
        folderTitle
        totalElements
        pageCount
        mediaCount(projectId: $projectId, permission: $permission, mediaType: $mediaType)
        records {
            itemType
            id
            parentFolderId
            code
            added
            name
            duration
            videoQuality(projectId: $projectId) {
                quality
                qualityStatus
            }
            hasChild
            poster(permission: $permission) {
                id
                url
            }
            childFolders {
                ...MediaBreadcrumbs
                childFolders {
                    ...MediaBreadcrumbs
                    childFolders {
                        ...MediaBreadcrumbs
                        childFolders {
                            ...MediaBreadcrumbs
                            childFolders {
                                ...MediaBreadcrumbs
                            }
                        }
                    }
                }
            }
        }
    }
}

fragment MediaBreadcrumbs on MediaItemType {
    itemType
        id
        parentFolderId
        code
        added
        name
        hasChild
        poster(permission: $permission) {
            id
            url
        }
}
`
