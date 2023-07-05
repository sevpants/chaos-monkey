function displayClosedTabs() {
    chrome.storage.local.get(['closedTabs'], function (result) {
        let closedTabs = result.closedTabs || [];
        let list = document.getElementById('closedTabsList');
        list.innerHTML = '';
        for (let tab of closedTabs) {
            let item = document.createElement('li');
            let link = document.createElement('a');
            link.href = tab.url;
            link.textContent = tab.title;
            let duration = document.createElement('span');
            duration.textContent = ` (duration: ${Math.round(tab.duration / 60000)} minutes)`;
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function () {
                closedTabs = closedTabs.filter(t => t !== tab);
                chrome.storage.local.set({ closedTabs: closedTabs });
                displayClosedTabs();
            });
            item.appendChild(link);
            item.appendChild(duration);
            item.appendChild(deleteButton);
            list.appendChild(item);
        }
    });
}

window.onload = displayClosedTabs;