window.onload = function() {
    // register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service_worker.js');
    }
}

