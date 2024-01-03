import { gql } from 'graphql-tag'

export const playlistAdd = gql`
mutation playlistAdd($projectId: Int!, $input: PlaylistAddInput, $page: PageInput) {
    playlistAdd(projectId: $projectId, input: $input, page: $page) {
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

export const playlistDelete = gql`
mutation playlistDelete($projectId: Int!, $input: PlaylistDeleteInput, $page: PageInput) {
    playlistDelete(projectId: $projectId, input: $input, page: $page) {
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

export const playlistMediaAdd = gql`
mutation playlistMediaAdd($projectId: Int!, $input: MediaAddToPlaylistInput, $page: PageInput) {
    playlistMediaAdd(projectId: $projectId, input: $input, page: $page) {
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
