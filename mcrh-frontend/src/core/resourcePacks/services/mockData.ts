import type { ResourcePack, MinecraftVersion } from '../models/ResourcePack';

/**
 * Mock data for development
 * This simulates the data that will come from the backend API
 */

export const mockMinecraftVersions: MinecraftVersion[] = [
    { id: '1', version: '1.20.1', releaseDate: new Date('2023-06-12') },
    { id: '2', version: '1.19.4', releaseDate: new Date('2023-03-14') },
    { id: '3', version: '1.19.2', releaseDate: new Date('2022-08-05') },
    { id: '4', version: '1.18.2', releaseDate: new Date('2022-02-28') },
    { id: '5', version: '1.16.5', releaseDate: new Date('2021-01-15') },
];

export const mockResourcePacks: ResourcePack[] = [
    {
        id: '1',
        name: 'Faithful 32x',
        description: 'A double resolution texture pack that stays faithful to the original Minecraft textures',
        author: 'Faithful Team',
        tags: ['vanilla', 'faithful', 'HD'],
        thumbnailUrl: 'https://via.placeholder.com/300x200/2e7d32/ffffff?text=Faithful+32x',
        downloadUrl: '/downloads/faithful-32x.zip',
        fileSize: 15728640, // 15 MB
        uploadDate: new Date('2024-01-15'),
        lastModified: new Date('2024-10-20'),
        minecraftVersions: [
            mockMinecraftVersions[0],
            mockMinecraftVersions[1],
        ],
        supportedMods: [
            { id: 'm1', name: 'OptiFine', version: '1.20.1' },
        ],
        supportedModpacks: [],
        downloadCount: 15432,
        isArchived: false,
    },
    {
        id: '2',
        name: 'Mizuno\'s 16 Craft',
        description: 'CIT resource pack with detailed textures for a more realistic Minecraft experience',
        author: 'Mizuno',
        tags: ['realistic', 'CIT', 'detailed'],
        thumbnailUrl: 'https://via.placeholder.com/300x200/8d6e63/ffffff?text=Mizuno+16',
        downloadUrl: '/downloads/mizunos-16.zip',
        fileSize: 25165824, // 24 MB
        uploadDate: new Date('2024-02-10'),
        lastModified: new Date('2024-10-18'),
        minecraftVersions: [
            mockMinecraftVersions[0],
            mockMinecraftVersions[1],
            mockMinecraftVersions[2],
        ],
        supportedMods: [
            { id: 'm1', name: 'OptiFine', version: '1.20.1' },
            { id: 'm2', name: 'CIT Resewn', version: '1.1.3' },
        ],
        supportedModpacks: [
            { id: 'mp1', name: 'All the Mods 9', version: '0.2.44' },
        ],
        downloadCount: 8921,
        isArchived: false,
    },
    {
        id: '3',
        name: 'Vanilla Tweaks',
        description: 'Customize your Minecraft experience with subtle improvements and tweaks',
        author: 'Xisumavoid',
        tags: ['vanilla', 'quality-of-life', 'customizable'],
        thumbnailUrl: 'https://via.placeholder.com/300x200/60ad5e/ffffff?text=Vanilla+Tweaks',
        downloadUrl: '/downloads/vanilla-tweaks.zip',
        fileSize: 5242880, // 5 MB
        uploadDate: new Date('2024-03-05'),
        lastModified: new Date('2024-10-22'),
        minecraftVersions: [
            mockMinecraftVersions[0],
            mockMinecraftVersions[1],
            mockMinecraftVersions[2],
            mockMinecraftVersions[3],
        ],
        supportedMods: [],
        supportedModpacks: [],
        downloadCount: 23456,
        isArchived: false,
    },
    {
        id: '4',
        name: 'Create: Resource Pack',
        description: 'Official resource pack for the Create mod with custom textures and models',
        author: 'simibubi',
        tags: ['mod-specific', 'create', 'mechanical'],
        thumbnailUrl: 'https://via.placeholder.com/300x200/be9c91/ffffff?text=Create+Pack',
        downloadUrl: '/downloads/create-pack.zip',
        fileSize: 10485760, // 10 MB
        uploadDate: new Date('2024-04-12'),
        lastModified: new Date('2024-09-30'),
        minecraftVersions: [
            mockMinecraftVersions[0],
            mockMinecraftVersions[1],
        ],
        supportedMods: [
            { id: 'm3', name: 'Create', version: '0.5.1' },
        ],
        supportedModpacks: [
            { id: 'mp2', name: 'Create: Above and Beyond', version: '1.3' },
        ],
        downloadCount: 12098,
        isArchived: false,
    },
];
