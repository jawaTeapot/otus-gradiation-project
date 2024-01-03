import { gql } from 'graphql-tag'

export const playlists = gql`
query playlists($projectId: Int!, $page: PageInput) {
    playlists(projectId: $projectId, page: $page) {
        totalElements
        pageCount
        records {
            id
            title
            code
            playlistType
            duration(projectId: $projectId)
            videoCount(projectId: $projectId)
            added
            poster(projectId: $projectId) {
                id
                url
            }
        }
    }
}
`
