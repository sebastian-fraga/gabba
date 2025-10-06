document.addEventListener('deviceready', function() {
    console.log('✅ deviceready llegó');

    if (window.FirebasePlugin) {
        console.log('FirebasePlugin disponible');

        FirebasePlugin.getToken(function(token) {
            console.log("✅ Token FCM:", token);

            FirebasePlugin.subscribe("all", function() {
                console.log("✅ Suscrito al canal general 'all'");
            }, function(error) {
                console.error("❌ Error suscribiendo al canal 'all':", error);
            });

        }, function(error) {
            console.error("❌ Error obteniendo token:", error);
        });

        FirebasePlugin.onTokenRefresh(function(token) {
            console.log("🔄 Nuevo token FCM:", token);
        }, function(error) {
            console.error("Error refrescando token:", error);
        });

        FirebasePlugin.onMessageReceived(function(message) {
            if (message.tap) {
                console.log("📩 Notificación abierta desde bandeja:", message);
            } else {
                console.log("📩 Notificación recibida en foreground:", message);
            }
        }, function(error) {
            console.error("Error recibiendo notificación:", error);
        });

    } else {
        console.warn("⚠️ FirebasePlugin NO disponible. Ejecutá en dispositivo real o emulador con Google Play.");
    }
}, false);

document.addEventListener('deviceready', async () => {
  await admob.start();

  let interstitial = new admob.InterstitialAd({
    adUnitId: 'ca-app-pub-3940256099942544/1033173712'
  });

  async function loadInterstitial() {
    interstitial = new admob.InterstitialAd({
      adUnitId: 'ca-app-pub-3940256099942544/1033173712'
    });
    await interstitial.load();
  }

  await loadInterstitial();

  let actionCount = 0;

  function userDidAction() {
    actionCount++;
    console.log("Acciones del usuario:", actionCount);

    if (actionCount % 3 === 0) {
      showInterstitial();
    }
  }

  async function showInterstitial() {
    if (await interstitial.isLoaded()) {
      await interstitial.show();
      console.log("Interstitial mostrado ✅");

      await loadInterstitial();
    } else {
      console.log("Interstitial todavía no cargado ❌");
    }
  }

  document.getElementById("btnAction").addEventListener("click", userDidAction);
});

