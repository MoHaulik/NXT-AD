document.addEventListener('DOMContentLoaded', () => {
    // ---- BACK BUTTON & RETURN FROM REDIRECT HANDLING ----
    let returningFromRedirect = (sessionStorage.getItem('returning') === 'true');
    sessionStorage.setItem('returning', 'false');

    function removeFadeOutClass() {
        document.body.classList.remove('fade-out');
    }
    removeFadeOutClass();
    window.addEventListener('pageshow', removeFadeOutClass);

    // ---- TUNNEL EFFECT CODE (unchanged) ----
    const tunnelWrapper = document.querySelector('.tunnel-wrapper');
    const squareCount = 6;
    const animationDuration = 10000;

    for (let i = 0; i < squareCount; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        const delay = i * (animationDuration / squareCount);
        square.style.animationDelay = `${delay}ms`;
        tunnelWrapper.appendChild(square);
    }

    // ---- DOM Elements ----
    const videoPlayer = document.getElementById('video-player');
    const loadingBar = document.getElementById('loading-bar');
    const launchButton = document.getElementById('launch-button');
    const navButtons = document.querySelectorAll('.nav-button');
    const introOverlay = document.getElementById('intro-overlay');
    const startButton = document.getElementById('start-button');
    const overlayLogo = document.getElementById('overlay-logo');
    const trendingLabel = document.getElementById('trending-label');
    const openOnQuestButton = document.getElementById('open-on-quest-button');

    // Flag to prevent double navigation
    let navLock = false;

    // Device detection for Quest (unchanged)
    function isQuestHeadset() {
        const parser = new UAParser();
        const result = parser.getResult();
        const browserName = result.browser.name || '';
        const deviceModel = result.device.model || '';
        const isOculusBrowser = browserName.includes('OculusBrowser');
        const isQuestDevice = deviceModel.includes('Quest');
        return isOculusBrowser || isQuestDevice;
    }

    function sendLinkToQuest(linkUrl) {
        if (!linkUrl.startsWith('https://')) {
            alert('Error: The URL must start with "https://".');
            return;
        }
        const encodedUrl = encodeURIComponent(linkUrl);
        const webLaunchEndpoint = `https://www.oculus.com/open_url/?url=${encodedUrl}`;
        window.location.href = webLaunchEndpoint;
    }

    function initializePage() {
        if (isQuestHeadset()) {
            openOnQuestButton.style.display = 'none';
        } else {
            openOnQuestButton.addEventListener('click', function() {
                sendLinkToQuest('https://mohaulik.github.io/NXTtestbuild/');
            });
        }
    }
    initializePage();

    // ---- ALL VIDEO DATA ----
    const videoData = [
        { filename: 'video1.mp4', link: 'https://esc.art/' },
        { filename: 'video2.mp4', link: 'https://brushworkvr.com/paint' },
        { filename: 'video3.mp4', link: 'https://moonrider.xyz/' },
        { filename: 'video4.mp4', link: 'https://aboveparadowski.com/' },
        { filename: 'video5.mp4', link: 'https://meetwol.com/' },
        { filename: 'video6.mp4', link: 'https://spatialfusion.io/' },
        { filename: 'video7.mp4', link: 'https://elysian.fun/' },
        { filename: 'video8.mp4', link: 'https://vhite-rabbit-xr.itch.io/mirror-mystery/' },
        { filename: 'video9.mp4', link: 'https://plockle.com/play' },
        { filename: 'video10.mp4', link: 'https://flowerbed.metademolab.com/' },
        { filename: 'video11.mp4', link: 'https://aframe.io/a-painter/' },
        { filename: 'video12.mp4', link: 'https://play.js13kgames.com/sup3rfr1ght-vr/' },
        { filename: 'video13.mp4', link: 'https://tyrovr.com/dust-devil/' },
        { filename: 'video14.mp4', link: 'https://play.js13kgames.com/the-dandelion-wars/' },
        { filename: 'video15.mp4', link: 'https://play.js13kgames.com/deathkeeper/' },
        { filename: 'video16.mp4', link: 'https://duzo.me/meduzonic/' },
        { filename: 'video17.mp4', link: 'https://davehill00.github.io/box/dist/index-beta.html' },
        { filename: 'video18.mp4', link: 'https://www.prehistoricdomain.com/map' },
        { filename: 'video19.mp4', link: 'https://www.yolopia.com/' },
        { filename: 'video20.mp4', link: 'https://play.js13kgames.com/haun13d-hotel/' },
        { filename: 'video21.mp4', link: 'https://vs76f-tyaaa-aaaak-qawda-cai.raw.ic0.app' },
        { filename: 'video22.mp4', link: 'https://worldsdemolisher.totalviz.com/' },
        { filename: 'video23.mp4', link: 'https://sorskoot.itch.io/last-stand' },
        { filename: 'video24.mp4', link: 'https://artsalad.net/' },
        { filename: 'video25.mp4', link: 'https://xrpet.me/' },
        { filename: 'video26.mp4', link: 'https://www.zesty.xyz/apps/jumpy-balls/' },
        { filename: 'video27.mp4', link: 'https://engine.needle.tools/samples-uploads/shooting-range/' },
        { filename: 'video28.mp4', link: 'https://play.js13kgames.com/ned-snow/' },
        { filename: 'video29.mp4', link: 'https://wonderlandengine.com/dead-secret-circle-web/' },
        { filename: 'video30.mp4', link: 'https://engine.needle.tools/samples-uploads/bow-and-arrow/' },
        { filename: 'video31.mp4', link: 'https://play.js13kgames.com/storage-space-13/' },
        { filename: 'video32.mp4', link: 'https://panstudiovr.io' },
        { filename: 'video33.mp4', link: 'https://yuripourre.itch.io/mole-mayhem' },
        { filename: 'video34.mp4', link: 'https://mulitasoft.itch.io/vr-darts' },
        { filename: 'video35.mp4', link: 'https://5imon.itch.io/pushpatternvr' },
        { filename: 'video36.mp4', link: 'https://lilg00s3.itch.io/drum-simulator-xr' },
        { filename: 'video37.mp4', link: 'https://willitaugment.itch.io/tumbleweed-defender' },
        { filename: 'video38.mp4', link: 'https://kodub.itch.io/planets-by-earth' },
        { filename: 'video39.mp4', link: 'https://yuripourre.itch.io/above-clouds' },
        { filename: 'video40.mp4', link: 'https://daydev.itch.io/xrpunch' },
        { filename: 'video41.mp4', link: 'https://js13kgames.com/games/tic-tac-woe' },
        { filename: 'video42.mp4', link: 'https://hacknick.itch.io/vr-archery' },
        { filename: 'video43.mp4', link: 'https://dsnopek.itch.io/constellation-coach-vr' },
        { filename: 'video44.mp4', link: 'https://varunramesh.itch.io/marble-mouse' },
        { filename: 'video45.mp4', link: 'https://daydev.itch.io/krasue' },
        { filename: 'video46.mp4', link: 'https://malcolmnixon.itch.io/dark-city' },
        { filename: 'video47.mp4', link: 'https://iintruder.itch.io/vaporwaverun' },
        { filename: 'video48.mp4', link: 'https://signorpipo.itch.io/labyroots' },
        { filename: 'video49.mp4', link: 'https://malcolmnixon.itch.io/vertigo-maze' },
        { filename: 'video50.mp4', link: 'https://signorpipo.itch.io/sir-please' }
    ];

    // Same trending set as previously
    const trendingVideos = [
        'video3.mp4',
        'video11.mp4', 'video12.mp4', 'video17.mp4', 'video19.mp4',
        'video20.mp4', 'video28.mp4', 'video29.mp4', 'video49.mp4'
    ];

    let currentPlaylist = createNewPlaylist();
    let currentVideoIndex = 0;
    let viewedHistory = []; // Store the history of viewed video indices
    const loadingTime = 20000;
    let redirectTimeout;

    if (returningFromRedirect) {
        navigateToNext();
    }

    function createNewPlaylist() {
        const shuffled = [...videoData];
        shuffleArray(shuffled);
        shuffled.forEach(video => {
            video.preloaded = false;
            video.videoElement = null;
        });
        return shuffled;
    }

    // Standard Fisher-Yates Shuffle
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function loadVideo(index) {
        if (navLock) return;
        navLock = true;

        if (index >= currentPlaylist.length || index < 0) {
            console.error("Invalid video index:", index);
            navLock = false;
            return;
        }

        const videoItem = currentPlaylist[index];

        // Fade out / exit animation
        videoPlayer.classList.remove('video-enter');
        videoPlayer.classList.add('video-exit');

        videoPlayer.pause();
        clearTimeout(redirectTimeout);

        setTimeout(() => {
            // Once fade-out completes, load the new src
            if (videoItem.preloaded && videoItem.videoElement) {
                videoPlayer.src = videoItem.videoElement.src;
                videoItem.videoElement = null;
            } else {
                videoPlayer.src = videoItem.filename;
            }
            videoPlayer.load();

            // Trigger fade-in
            videoPlayer.classList.remove('video-exit');
            void videoPlayer.offsetWidth; // force reflow
            videoPlayer.classList.add('video-enter');

            resetLoadingBar();
            checkTrending();
            preloadAdjacentVideos(2);

            setTimeout(() => { navLock = false; }, 600);
        }, 300);
    }

    function resetLoadingBar() {
        loadingBar.style.transition = 'none';
        loadingBar.style.width = '0%';

        videoPlayer.oncanplay = startPlayback;
        videoPlayer.onended = redirectToExperience;

        videoPlayer.onerror = function() {
            console.error('Error loading video:', videoPlayer.error);
            navigateToNext(); // skip forward on error
        };
    }

    function startPlayback() {
        videoPlayer.oncanplay = null;
        videoPlayer.play();
        startLoadingAnimation();
    }

    function startLoadingAnimation() {
        clearTimeout(redirectTimeout);
        loadingBar.style.transition = 'none';
        loadingBar.offsetHeight;
        loadingBar.style.width = '0%';

        setTimeout(() => {
            loadingBar.style.transition = `width ${loadingTime}ms linear`;
            loadingBar.style.width = '100%';
        }, 10);

        redirectTimeout = setTimeout(redirectToExperience, loadingTime);
    }

    function redirectToExperience() {
        // Mark session as "returning" for when user comes back
        sessionStorage.setItem('returning', 'true');

        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = currentPlaylist[currentVideoIndex].link;
        }, 700);
    }

    // Navigation
    function navigateToNext() {
        if (navLock) return;

        viewedHistory.push(currentVideoIndex);

        if (currentVideoIndex < currentPlaylist.length - 1) {
            currentVideoIndex++;
        } else {
            // End of playlist, create a new one and start from the beginning
            currentPlaylist = createNewPlaylist();
            viewedHistory = []; // Clear history since we have a new playlist
            currentVideoIndex = 0;
        }
        loadVideo(currentVideoIndex);
    }

    function navigateToPrevious() {
        if (navLock) return;

        if (viewedHistory.length > 0) {
            currentVideoIndex = viewedHistory.pop();
            loadVideo(currentVideoIndex);
        } else {
            // At the start, go to the last video of the current playlist if needed
            currentVideoIndex = currentPlaylist.length - 1;
            loadVideo(currentVideoIndex);
        }
    }

    // Allow starting by pressing down (next) even if intro overlay is visible
    function maybeStartFromIntro() {
        if (introOverlay.style.display !== 'none') {
            introOverlay.style.display = 'none';
            loadVideo(currentVideoIndex);
        }
    }

    function handleSwipe(direction) {
        // Ensure that we can start by pressing down on the first page
        maybeStartFromIntro();

        // Down = Next, Up = Previous (inverted from original)
        if (direction === 'down') {
            navigateToNext();
        } else if (direction === 'up') {
            navigateToPrevious();
        }
    }

    function checkTrending() {
        const currentFilename = currentPlaylist[currentVideoIndex].filename;
        if (trendingVideos.includes(currentFilename)) {
            trendingLabel.classList.remove('hidden');
            launchButton.classList.add('trending');
        } else {
            trendingLabel.classList.add('hidden');
            launchButton.classList.remove('trending');
        }
    }

    function preloadAdjacentVideos(count) {
        for (let i = 1; i <= count; i++) {
            // Next videos
            const nextIndex = currentVideoIndex + i;
            if (nextIndex < currentPlaylist.length) {
                const videoItemNext = currentPlaylist[nextIndex];
                if (!videoItemNext.preloaded) {
                    videoItemNext.preloaded = true;
                    const vidNext = document.createElement('video');
                    vidNext.src = videoItemNext.filename;
                    vidNext.preload = 'metadata';
                    videoItemNext.videoElement = vidNext;
                }
            }
            // Previous videos
            const prevIndex = currentVideoIndex - i;
            if (prevIndex >= 0) {
                const videoItemPrev = currentPlaylist[prevIndex];
                if (!videoItemPrev.preloaded) {
                    videoItemPrev.preloaded = true;
                    const vidPrev = document.createElement('video');
                    vidPrev.src = videoItemPrev.filename;
                    vidPrev.preload = 'metadata';
                    videoItemPrev.videoElement = vidPrev;
                }
            }
        }
    }

    // ---- SWIPE CONTROLS via Hammer.js ----
    const hammer = new Hammer(videoPlayer);
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    hammer.on('swipeup swipedown', ev => {
        handleSwipe(ev.type === 'swipeup' ? 'up' : 'down');
    });

    // Navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            handleSwipe(button.dataset.direction);
        });
    });

    // Launch button (manual redirect)
    launchButton.addEventListener('click', () => {
        clearTimeout(redirectTimeout);
        redirectToExperience();
    });

    // Start button: hide the intro overlay, load the first video
    startButton.addEventListener('click', () => {
        introOverlay.style.display = 'none';
        loadVideo(currentVideoIndex);
    });

    // Observer for overlay logo (unchanged)
    const observer = new MutationObserver(() => {
        const display = window.getComputedStyle(introOverlay).display;
        overlayLogo.classList.toggle('hidden', display === 'none');
    });
    observer.observe(introOverlay, { attributes: true, attributeFilter: ['style'] });

    overlayLogo.classList.remove('hidden');

    // If there's no intro, load the first video immediately
    if (introOverlay.style.display === 'none') {
        loadVideo(currentVideoIndex);
    }
});
