import { gql } from 'graphql-tag'

export const mediaItemDelete = gql`
mutation mediaItemDelete($projectId: Int!, $permission: UserPermission, $mediaType: MediaType, $folderType: FolderModelType, $input: ItemDeleteInput, $page: PageInput={}) {
    mediaItemDelete(projectId: $projectId, permission: $permission, mediaType: $mediaType, folderType: $folderType, input: $input, page: $page) {
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

export const mediaVideoAddToEntity = gql`
mutation mediaVideoAddToEntity($projectId: Int!, $permission: UserPermission, $input: MediaAddVideoToEntityInput) {
    mediaVideoAddToEntity(projectId: $projectId, permission: $permission, input: $input) {
        records {
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
                poster(permission: $permission) {
                    id
                    url
                }
            }
    }
}
`
