import { gql } from 'graphql-tag'

export const mediaItems = gql`
query mediaItems($projectId: Int!, $permission: UserPermission, $mediaType: MediaType, $filter: MediaFilter, $page: PageInput={}) {
    mediaItems(projectId: $projectId, permission: $permission, mediaType: $mediaType, filter: $filter, page: $page) {
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
            duration
            parentFolderId
            code
            added
            name
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
                ...MediaFolderBreadcrumbs
                childFolders {
                    ...MediaFolderBreadcrumbs
                    childFolders {
                        ...MediaFolderBreadcrumbs
                        childFolders {
                            ...MediaFolderBreadcrumbs
                            childFolders {
                                ...MediaFolderBreadcrumbs
                            }
                        }
                    }
                }
            }
        }
    }
}

fragment MediaFolderBreadcrumbs on MediaItemType {
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
