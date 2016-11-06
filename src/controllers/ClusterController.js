import api from '../api';

class ClusterController {
    constructor (clusterOptions, mapController) {
        this._cluster = new (api.getAPI()).Clusterer(clusterOptions);
        this._mapController = mapController;
        this._setupCollection();
    }

    getAPIInstance () {
        return this._cluster;
    }

    _setupCollection () {
        this._geoCollection = new (api.getAPI()).GeoObjectCollection();
        this._mapController.appendCluster(this._cluster);
    }

    appendMarker(marker) {
        this._cluster.add(marker.getAPIInstance());
        this.setBalloonState(marker, marker.balloonState);
        this._mapController.map.setBounds(this._cluster.getBounds());
    }

    closeBalloon() {
        this._cluster.balloon.close();
    }

    setBalloonState(marker, state) {
        if (state === 'opened') {
            const geoObjectState = this._cluster.getObjectState(marker.getAPIInstance());
            if (geoObjectState.isShown) {
                if (geoObjectState.isClustered) {
                    geoObjectState.cluster.state.set('activeObject', marker.getAPIInstance());
                    this._cluster.balloon.open(geoObjectState.cluster);
                } else {
                    marker.setBalloonState(marker.balloonState);
                }
            }
        } else {
            marker.setBalloonState(marker.balloonState);
        }
    }

    destroyMarker(marker) {
        this._cluster.remove(marker.getAPIInstance());
    }
}

export default ClusterController;
