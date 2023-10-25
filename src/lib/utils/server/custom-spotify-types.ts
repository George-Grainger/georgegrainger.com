export interface TopTrack {
	title: string;
	creator: string;
	imgUrl: string;
	imgPreviewUrl: string;
	playUrl: string;
	previewUrl?: string;
}

export interface LastPlayedMedia extends TopTrack {
	isPlaying: boolean;
	duration: number;
	progressMs: number;
	playedAt: string;
}
