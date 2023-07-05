let tabs = {};

chrome.tabs.onCreated.addListener(tab => {
    if (!tab.pinned) {
        tabs[tab.id] = { url: tab.url, title: tab.title, created: Date.now(), lastActive: Date.now() };
        console.log(`Tab created: id=${tab.id}, url=${tab.url}, title=${tab.title}`);
    }
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && !tab.pinned) {
        tabs[tabId] = { url: tab.url, title: tab.title, lastActive: Date.now() };
        console.log(`Tab updated: id=${tabId}, lastActive=${tabs[tabId].lastActive}`);
    }
});

chrome.tabs.onActivated.addListener(activeInfo => {
    let tab = tabs[activeInfo.tabId];
    if (tab) {
        tab.lastActive = Date.now();
        console.log(`Tab activated: id=${activeInfo.tabId}, lastActive=${tab.lastActive}`);
    }
});

function checkTabs() {
    let now = Date.now();
    console.log(`Checking tabs at ${now}`);
    console.log(tabs);
    for (let tabId in tabs) {
        let tab = tabs[tabId];
        let secondsSinceLastActive = (now - tab.lastActive) / 1000;
        let secondsSinceCreated = (now - tab.created) / 1000;
        console.log(`Checking tab ${tab.title}: timeSinceCreated=${secondsSinceCreated}, timeSinceLastUsed=${secondsSinceLastActive}`);
        // let timeSinceCreatedGreaterThanOneMinute = now - tab.created > 1 * 60 * 1000
        let lastActiveGreaterThanOneHour = now - tab.lastActive > 60 * 60 * 1000
        if (lastActiveGreaterThanOneHour) {
            chrome.tabs.remove(parseInt(tabId));
            chrome.storage.local.get(['closedTabs'], function (result) {
                let closedTabs = result.closedTabs || [];
                closedTabs.push({ ...tab, closed: now, duration: now - tab.created });
                chrome.storage.local.set({ closedTabs: closedTabs });
            });
            console.log(`Tab closed: id=${tabId}, url=${tab.url}, title=${tab.title}, duration=${now - tab.created}`);
            delete tabs[tabId];
        }
    }
}

chrome.alarms.create('checkTabs', { periodInMinutes: 0.5 });

chrome.alarms.create('checkForWorking', { periodInMinutes: 0.5 })

chrome.alarms.onAlarm.addListener(alarm => {
    if (alarm.name === 'checkTabs') {
        checkTabs();
    } else if (alarm.name === 'checkForWorking') {
        console.log('Just checking if this is working');
    }
});

chrome.windows.getAll({ populate: true }, function (windows) {
    windows.forEach(function (window) {
        window.tabs.forEach(function (tab) {
            if (!tab.pinned) {
                tabs[tab.id] = { url: tab.url, title: tab.title, created: Date.now(), lastActive: Date.now() };
                console.log(`Tab added to memory: id=${tab.id}, url=${tab.url}, title=${tab.title}`);
            }
        });
    });
});
