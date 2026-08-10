interface PublishResult {
  platform: string;
  success: boolean;
  videoId?: string;
  url?: string;
  error?: string;
}

export async function publishToWechatVideo(
  videoPath: string,
  title: string,
  description: string
): Promise<PublishResult> {
  try {
    const token = process.env.WECHAT_VIDEO_TOKEN;
    if (!token) {
      return { platform: "wechat", success: false, error: "未配置微信视频号 Token" };
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", videoPath);

    const response = await fetch(
      "https://api.weixin.qq.com/cgi-bin/ channels/video/publish?access_token=" + token,
      { method: "POST", body: formData }
    );

    const data = await response.json();
    if (data.errcode === 0) {
      return { platform: "wechat", success: true, videoId: data.video_id };
    }
    return { platform: "wechat", success: false, error: data.errmsg };
  } catch (error: any) {
    return { platform: "wechat", success: false, error: error.message };
  }
}

export async function publishToDouyin(
  videoPath: string,
  title: string
): Promise<PublishResult> {
  try {
    const token = process.env.DOUYIN_ACCESS_TOKEN;
    if (!token) {
      return { platform: "douyin", success: false, error: "未配置抖音 Token" };
    }

    const response = await fetch(
      `https://open.douyin.com/api/douyin/v1/video/upload_video?access_token=${token}`,
      { method: "POST", body: videoPath }
    );

    const data = await response.json();
    if (data.data?.error_code === 0) {
      return { platform: "douyin", success: true, videoId: data.data.video_id };
    }
    return { platform: "douyin", success: false, error: data.data?.description };
  } catch (error: any) {
    return { platform: "douyin", success: false, error: error.message };
  }
}

export async function publishToAllPlatforms(
  videoPath: string,
  title: string,
  description: string
): Promise<PublishResult[]> {
  const results: PublishResult[] = [];

  results.push(await publishToWechatVideo(videoPath, title, description));
  results.push(await publishToDouyin(videoPath, title));

  return results;
}
