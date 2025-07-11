workspace=marketplace

# This variables defines the rhdh and dynamic-plugins-root paths.
#
# The default expects that you have this rhdh-plugins and the rhdh
# repo are cloned close to each other.
#
# If you don't have the org structure locally you can override this
# with make arguments like this:
#
#   make rhdh=../../../rhdh <command like copy>
#
# Or use an absolute path:
#
#   make rhdh=~/git/rhdh <command like copy>
rhdh=../../../rhdh

# The dynamic-plugins-root has two more ../.. because it's relative
# to the plugins/* folders
dproot=../../${rhdh}/dynamic-plugins-root

clean=true

dev=true

fix:
	@echo
	@echo fix and format ${workspace} workspace
	@echo
	yarn tsc:full
	yarn build:api-reports:only

add-to-rhdh: add-frontend-to-rhdh add-backend-to-rhdh add-catalog-modules-to-rhdh copy-config-to-rhdh

add-frontend-to-rhdh:
	@echo
	@echo Will build and install ${workspace} frontend into ${rhdh}
	@echo
	cd plugins/marketplace && npx --yes @janus-idp/cli package export-dynamic-plugin --dynamic-plugins-root "${dproot}" --clean "${clean}" --dev "${dev}"

add-backend-to-rhdh:
	@echo
	@echo Will build and install ${workspace} backend into ${rhdh}
	@echo
	cd plugins/marketplace-backend && npx --yes @janus-idp/cli package export-dynamic-plugin --dynamic-plugins-root "${dproot}" --clean "${clean}" --dev "${dev}"

add-catalog-modules-to-rhdh:
	@echo
	@echo Will build and install catalog modules into ${rhdh}
	@echo
	cd plugins/catalog-backend-module-marketplace && npx --yes @janus-idp/cli package export-dynamic-plugin --dynamic-plugins-root "${dproot}" --clean "${clean}" --dev "${dev}" --embed-package "@red-hat-developer-hub/backstage-plugin-marketplace-common"

copy-config-to-rhdh:
	@echo
	@echo Copy app-config.dynamic.yaml into ${rhdh}
	@echo
	cp app-config.dynamic.yaml "${rhdh}/app-config-marketplace.local.yaml"
	@echo
	@echo You can start your rhdh now with
	@echo
	@echo yarn start
	@echo

remove-from-rhdh:
	@echo
	@echo Remove packages from ${rhdh}
	@echo
	rm -rf "${dproot}/red-hat-developer-hub-backstage-plugin-marketplace"
	rm -rf "${dproot}/red-hat-developer-hub-backstage-plugin-marketplace-backend-dynamic"
	rm -rf "${dproot}/red-hat-developer-hub-backstage-plugin-catalog-backend-module-marketplace-dynamic"
