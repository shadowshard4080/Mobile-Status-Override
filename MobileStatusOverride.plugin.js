/**
 * @name MobileStatusOverride
 * @version 1.0.0
 * @description Overrides the mobile status indicator by setting your Discord status to Idle manually when the PC this plugin is run on is idle.
 * @author thewildwerewolf
 * @invite evEBvhVYZc
 */

module.exports = class MobileStatusOverridePlugin {
    getName() {
        return "Mobile Status Override";
    }

    getDescription() {
        return "Overrides the mobile status indicator by setting your Discord status to Idle manually when this client is idle.";
    }

    getVersion() {
        return "1.0.0";
    }

    getAuthor() {
        return "thewildwerewolf";
    }

    start() {
        this.idleTimeout = 300000; // 5 minutes (adjust as needed)
        this.lastActivity = Date.now();

        // Hook into the onSwitch event
        document.addEventListener("visibilitychange", this.onSwitch.bind(this));
    }

    stop() {
        document.removeEventListener("visibilitychange", this.onSwitch.bind(this));
    }

    onSwitch() {
        if (document.visibilityState === "hidden") {
            this.lastActivity = Date.now();
        } else {
            const timeSinceLastActivity = Date.now() - this.lastActivity;
            if (timeSinceLastActivity > this.idleTimeout) {
                const { user } = BdApi.findModuleByProps("getUsers");
                BdApi.findModuleByProps("setStatus").setStatus(user.id, { mobile: false, status: "idle" });
            }
        }
    }
};
