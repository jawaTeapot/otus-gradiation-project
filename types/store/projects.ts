import type { TreeKey } from 'element-plus/es/components/tree-v2/src/types'

export type Stat = {
    vodCount: number;
    liveCount: number;
    materialsCount: number;
    playlistCount: number;
    subscriptionCount: number;
    passwordCount: number;
    collectionCount: number;
    conferenceCount: number;
}

export type Project = {
    id: string;
    title: string;
    hasDrm: boolean;
    hasBranding: boolean;
    stat: Stat;
}

export type ProjectSettingsIntegrationApiKeyList = {
    id: number;
    apiKey: string;
    allowType: string;
    name: string | null;
    added: string;
}

export type ProjectSettingsIntegration = {
    apiKey: string;
    apiKeyFtp: string;
    code: string;
    downloadFromComputer: boolean;
    downloadByLink: boolean;
    autoBroadcasting: boolean;
    timepadNotifaication: boolean;
    domain: string;
    apiKeyList: Array<ProjectSettingsIntegrationApiKeyList>;
}

export type ProjectSettingsProtection = {
    useDirectLink: boolean;
    isEncrypt: boolean;
    security: string;
    userAgentAllow: Array<string>;
    userAgentDeny: Array<string>;
    deniedEmptyReferrer: boolean;
    timeValid: number | null;
    domains: {
        domainList: Array<string>;
    }
}

export type ProjectSettingsTargetingCountryList = {
    id: number;
    iso: string;
    isSelected: boolean;
}

export type ProjectSettingsTargetingCountries = {
    iso: string;
    countryList: Array<ProjectSettingsTargetingCountryList>;
}

export type ProjectSettingsTargeting = {
    useTargeting: boolean;
    showUnknown: boolean;
    countries: Array<ProjectSettingsTargetingCountries>;
}

export type ProjectSettingsPageImage = {
    name: string;
    url: string
}

export type ProjectSettingsPage = {
    usePage: boolean;
    indexPage: boolean;
    siteName: string;
    slogan: string;
    image: ProjectSettingsPageImage | null;
    useShare: boolean;
    useLikes: boolean;
    useDownload: boolean;
    useComments: boolean;
    commentsType: string | null;
    commentsId: string | null;
    useGoogle: boolean;
    googleCode: string | null;
}

export type ProjectSettingsBrandingPlayerLogoImage = {
    name: string;
    url: string;
}

export type ProjectSettingsBrandingPlayerLogo = {
    playerLogoImage: ProjectSettingsBrandingPlayerLogoImage | null;
    usePlayerLogo: boolean;
    playerLogoUrl: string | null;
    playerLogoPosition: string;
    playerLogoMargin: number;
}

export type ProjectSettingsBrandingPlayButtonImage = {
    name: string;
    url: string;
}

export type ProjectSettingsBrandingPlayButton = {
    playButtonImage: ProjectSettingsBrandingPlayButtonImage | null;
    usePlayButton: boolean;
}

export type ProjectSettingsBrandingPpvLogoImage = {
    name: string;
    url: string;
}

export type ProjectSettingsBrandingPpvLogo = {
    playerPpvImage: ProjectSettingsBrandingPpvLogoImage | null;
    usePpvLogo: boolean;
}

export type ProjectSettingsBrandingEmailPatternLogoImage = {
    name: string;
    url: string;
}

export type ProjectSettingsBrandingEmailPattern = {
    useEmailLogo: boolean;
    emailLogoImage: ProjectSettingsBrandingEmailPatternLogoImage | null;
    emailLogoBg: string;
    removeBoomstreamContact: boolean;
    emailSubjectString: string | null;
    logoDescription: string;
    emailDescriptionColor: string;
}

export type ProjectSettingsBrandingSmtpSettings = {
    useCustomEmails: boolean;
    smtpHost: string | null;
    smtpPort: string | null;
    login: string | null;
    password: string | null;
    email: string | null;
    senderName: string | null;
    encryptionType: string;
    isVerified: string | null;
}

export type ProjectSettingsBrandingDomainParking = {
    useDomain: boolean;
    domain: string;
    redirectUrl: string;
    protocol: string;
    domainNextCheck: string;
    domainStatus: string;
    domainIsExist: boolean;
}

export type ProjectSettingsBrandingAnalyticsCounter = {
    useGoogleAnalytics: boolean;
    googleAnalyticsCode: string | null
    useYandexMetrika: boolean;
    yandexMetrikaCode: string | null;
    useFacebookPixel: boolean;
    facebookPixelCode: string | null;
}

export type ProjectSettingsBranding = {
    playerLogo: ProjectSettingsBrandingPlayerLogo;
    playButton: ProjectSettingsBrandingPlayButton;
    ppvLogo: ProjectSettingsBrandingPpvLogo;
    emailPattern: ProjectSettingsBrandingEmailPattern;
    smtpSettings: ProjectSettingsBrandingSmtpSettings;
    domainParking: ProjectSettingsBrandingDomainParking;
    analyticsCounter: ProjectSettingsBrandingAnalyticsCounter;
}

export type ProjectSettingsWebhook = {
    id: number;
    name: string | null;
    url: string | null;
    createdAt: string | null;
    status: string | null
}

export type ProjectSettings = {
    id: number | string;
    integration: ProjectSettingsIntegration;
    protection: ProjectSettingsProtection;
    targeting: ProjectSettingsTargeting;
    skin: {
        skinType: string;
    },
    page: ProjectSettingsPage;
    branding: ProjectSettingsBranding;
    webhook: {
        webhookNameList: Array<string>;
        webhookList: Array<ProjectSettingsWebhook>;
    }
}

export type ProjectSettingsQuery = {
    userProjectSettings: ProjectSettings;
}

export type CreateProjectDTO = {
    input: {
        attribute : string;
        title : string;
    }
}

export type DeletedProjectDTO = {
    input: {
        id : string;
    }
}

export type ProjectChangeTitleDTO = {
    input: {
        id: string;
        title: string;
    }
}

export type ActivateBrandingDTO = {
    input: {
        id: string;
    }
}

export type ActivateDRMDTO = {
    input: {
        id: string;
    }
}

export type GenerateAPIKeyDTO = {
    projectId: number | string;
}

export type GenerateCodeDTO = {
    projectId: number | string;
}

export type GenerateAPIKeyFtpDTO = {
    projectId: number | string;
}

export type AddApiKeyDTO = {
    projectId: number | string;
    input: {
        name: string | null;
        keyAllowType: string;
    }
}

export type DeleteApiKeyDTO = {
    projectId: number | string;
    input: {
        id: number;
    }
}

export type UpdateIntegrationDTO = {
    projectId: number | string;
    input: {
        downloadFromComputer: boolean;
        downloadByLink: boolean;
        autoBroadcasting: boolean;
        timepadNotifaication: boolean;
    }
}

export type UpdateProtectionDTO = {
    projectId: number | string;
    input: {
        useDirectLink: boolean;
    }
}

export type RestreamingProtectionDisableDTO = {
    projectId: number | string;
    input: {
        userAgentAllow: Array<string> | null;
        userAgentDeny: Array<string> | null;
    }
}

export type RestreamingProtectionByDomainDTO = {
    projectId: number | string;
    input: {
        userAgentAllow: Array<string> | null;
        userAgentDeny: Array<string> | null;
        deniedEmptyReferrer: boolean;
        domains: Array<string>;
    }
}

export type RestreamingProtectionByIpDTO = {
    projectId: number | string;
    input: {
        userAgentAllow: Array<string> | null;
        userAgentDeny: Array<string> | null;
    }
}

export type RestreamingProtectionByTimeDTO = {
    projectId: number | string;
    input: {
        userAgentAllow: Array<string> | null;
        userAgentDeny: Array<string> | null;
        timeValid: number | null;
    }
}

export type ProjectTargetingUpdateDTO = {
    projectId: number | string;
    input: {
        useTargeting: boolean;
        showUnknown: boolean;
        selectedCountries: Array<number> | TreeKey[];
    }
}

export type CreateProjectResponse = {
    userProjectCreate: {
        record: Project;
    }
}

export type DeletedProjectResponse = {
    userProjectDeleted: {
        response: string;
    }
}

export type ProjectChangeTitleResponse = {
    userProjectChangeTitle: {
        title: string;
    }
}

export type ActivateBrandingResponse = {
    userProjectActivateBranding: {
        response: string;
    }
}

export type ActivateDRMResponse = {
    userProjectActivateDRM: {
        response: string;
    }
}

export type GenerateAPIKeyResponse = {
    userProjectGenerateAPIKey: {
        apiKey: string;
    }
}

export type GenerateCodeResponse = {
    usrProjectGenerateCode: {
        code: string;
    }
}

export type GenerateAPIKeyFtpResponse = {
    userProjectGenerateAPIKeyFtp: {
        apiKeyFtp: string;
    }
}

export type AddApiKeyResponse = {
    userProjectAddApiKey: {
        apiKeyList: Array<ProjectSettingsIntegrationApiKeyList>;
    }
}

export type DeleteApiKeyResponse = {
    userProjectDeleteApiKey: {
        response: string;
    }
}

export type UpdateIntegrationResponse = {
    userProjectIntegrationUpdate: ProjectSettingsIntegration;
}

export type UpdateProtectionResponse = {
    userProjectProtectionUpdate: {
        response: string;
    }
}

export type RestreamingProtectionDisableResponse = {
    userProjectRestreamingProtectionDisable: {
        userAgentAllow: Array<string>;
        userAgentDeny: Array<string>;
    }
}

export type RestreamingProtectionByDomainResponse = {
    userProjectRestreamingProtectionByDomain: {
        userAgentAllow: Array<string>;
        userAgentDeny: Array<string>;
        deniedEmptyReferrer: boolean;
        domains: {
            domainList: Array<string>;
        }
    }
}

export type RestreamingProtectionByIpResponse = {
    userProjectRestreamingProtectionByIp: {
        userAgentAllow: Array<string>;
        userAgentDeny: Array<string>;
    }
}

export type RestreamingProtectionByTimeResponse = {
    userProjectRestreamingProtectionByTime: {
        userAgentAllow: Array<string>;
        userAgentDeny: Array<string>;
        timeValid: number | null;
    }
}

export type ProjectTargetingUpdateResponse = {
    userProjectTargetingUpdate: ProjectSettingsTargeting;
}
