let focus = 0;
let distract = 0;

setInterval(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        const url = tab?.url || '';
        const isDistracted = /youtube|twitter|tiktok|reddit|netflix/i.test(url);

        if (isDistracted) distract += 5;
        else focus += 5;

        chrome.storage.local.set({
            focusedTime: focus,
            distractedTime: distract,
            lastUrl: url,
            lastUpdate: Date.now(),
        });
    });
}, 5000);
