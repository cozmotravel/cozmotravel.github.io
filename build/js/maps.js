$(".show-hidden-map").on("click", function (e) {
	e.preventDefault();
	$(".show-hidden-map").find("span").text($(".show-hidden-map span").text() === 'Close' ? 'On The Map' : 'Close');
	$(".hidden-map-container").slideToggle(400);
});
function showColumnhiddenmap() {
	if ($(window).width() < 1064) {
		$(".hid-mob-map").animate({
			right: 0
		}, 500, "easeInOutExpo").addClass("fixed-mobile");
	}
}
$(".map-item , .schm").on("click", function (e) {
	e.preventDefault();
	showColumnhiddenmap();
});
$('.map-close').on("click", function (e) {
	$(".hid-mob-map").animate({
		right: "-100%"
	}, 500, "easeInOutExpo").removeClass("fixed-mobile");
});





function cardRaining() {
    $.fn.duplicate = function (a, b) {
        var c = [];
        for (var d = 0; d < a; d++) $.merge(c, this.clone(b).get());
        return this.pushStack(c);
    };
    var cr = $(".card-popup-raining"),
        sts = $(".section-title-separator span");
    cr.each(function (cr) {
        var starcount = $(this).attr("data-starrating");
        $("<i class='fas fa-star'></i>").duplicate(starcount).prependTo(this);
    });
    sts.each(function (sts) {
        $("<i class='fas fa-star'></i>").duplicate(3).prependTo(this);
    })
}
cardRaining();

var cr2 = $(".card-popup-rainingvis");
cr2.each(function (cr) {
    var starcount2 = $(this).attr("data-starrating2");
    $("<i class='fa fa-star'></i>").duplicate(starcount2).prependTo(this);
});






function mainMap() {
    setMapHeight();
    //$('#map-view-div').scrollToFixed({ limit: $($('.limit-box')).offset().top });
  


    //MAP PLUGINS

    "use strict"; function InfoBox(t) { t = t || {}, google.maps.OverlayView.apply(this, arguments), this.content_ = t.content || "", this.disableAutoPan_ = t.disableAutoPan || !1, this.maxWidth_ = t.maxWidth || 0, this.pixelOffset_ = t.pixelOffset || new google.maps.Size(0, 0), this.position_ = t.position || new google.maps.LatLng(0, 0), this.zIndex_ = t.zIndex || null, this.boxClass_ = t.boxClass || "infoBox", this.boxStyle_ = t.boxStyle || {}, this.closeBoxMargin_ = t.closeBoxMargin || "2px", this.closeBoxURL_ = t.closeBoxURL || "http://www.google.com/intl/en_us/mapfiles/close.gif", "" === t.closeBoxURL && (this.closeBoxURL_ = ""), this.infoBoxClearance_ = t.infoBoxClearance || new google.maps.Size(1, 1), void 0 === t.visible && (void 0 === t.isHidden ? t.visible = !0 : t.visible = !t.isHidden), this.isHidden_ = !t.visible, this.alignBottom_ = t.alignBottom || !1, this.pane_ = t.pane || "floatPane", this.enableEventPropagation_ = t.enableEventPropagation || !1, this.div_ = null, this.closeListener_ = null, this.moveListener_ = null, this.contextListener_ = null, this.eventListeners_ = null, this.fixedWidthSet_ = null } InfoBox.prototype = new google.maps.OverlayView, InfoBox.prototype.createInfoBoxDiv_ = function () { var t, i, e, o = this, s = function (t) { t.cancelBubble = !0, t.stopPropagation && t.stopPropagation() }; if (!this.div_) { if (this.div_ = document.createElement("div"), this.setBoxStyle_(), void 0 === this.content_.nodeType ? this.div_.innerHTML = this.getCloseBoxImg_() + this.content_ : (this.div_.innerHTML = this.getCloseBoxImg_(), this.div_.appendChild(this.content_)), this.getPanes()[this.pane_].appendChild(this.div_), this.addClickHandler_(), this.div_.style.width ? this.fixedWidthSet_ = !0 : 0 != this.maxWidth_ && this.div_.offsetWidth > this.maxWidth_ ? (this.div_.style.width = this.maxWidth_, this.div_.style.overflow = "auto", this.fixedWidthSet_ = !0) : (e = this.getBoxWidths_(), this.div_.style.width = this.div_.offsetWidth - e.left - e.right + "px", this.fixedWidthSet_ = !1), this.panBox_(this.disableAutoPan_), !this.enableEventPropagation_) { for (this.eventListeners_ = [], i = ["mousedown", "mouseover", "mouseout", "mouseup", "click", "dblclick", "touchstart", "touchend", "touchmove"], t = 0; t < i.length; t++) this.eventListeners_.push(google.maps.event.addDomListener(this.div_, i[t], s)); this.eventListeners_.push(google.maps.event.addDomListener(this.div_, "mouseover", function (t) { this.style.cursor = "default" })) } this.contextListener_ = google.maps.event.addDomListener(this.div_, "contextmenu", function (t) { t.returnValue = !1, t.preventDefault && t.preventDefault(), o.enableEventPropagation_ || s(t) }), google.maps.event.trigger(this, "domready") } }, InfoBox.prototype.getCloseBoxImg_ = function () { var t = ""; return "" != this.closeBoxURL_ && (t = "<img", t += " src='" + this.closeBoxURL_ + "'", t += " align=right", t += " style='", t += " position: relative;", t += " cursor: pointer;", t += " margin: " + this.closeBoxMargin_ + ";", t += "'>"), t }, InfoBox.prototype.addClickHandler_ = function () { var t; "" != this.closeBoxURL_ ? (t = this.div_.firstChild, this.closeListener_ = google.maps.event.addDomListener(t, "click", this.getCloseClickHandler_())) : this.closeListener_ = null }, InfoBox.prototype.getCloseClickHandler_ = function () { var t = this; return function (i) { i.cancelBubble = !0, i.stopPropagation && i.stopPropagation(), google.maps.event.trigger(t, "closeclick"), t.close() } }, InfoBox.prototype.panBox_ = function (t) { var i, e = 0, o = 0; if (!t && (i = this.getMap()) instanceof google.maps.Map) { i.getBounds().contains(this.position_) || i.setCenter(this.position_), i.getBounds(); var s = i.getDiv(), n = s.offsetWidth, h = s.offsetHeight, l = this.pixelOffset_.width, d = this.pixelOffset_.height, r = this.div_.offsetWidth, a = this.div_.offsetHeight, _ = this.infoBoxClearance_.width, p = this.infoBoxClearance_.height, v = this.getProjection().fromLatLngToContainerPixel(this.position_); if (v.x < -l + _ ? e = v.x + l - _ : v.x + r + l + _ > n && (e = v.x + r + l + _ - n), this.alignBottom_ ? v.y < -d + p + a ? o = v.y + d - p - a : v.y + d + p > h && (o = v.y + d + p - h) : v.y < -d + p ? o = v.y + d - p : v.y + a + d + p > h && (o = v.y + a + d + p - h), 0 !== e || 0 !== o) { i.getCenter(); i.panBy(e, o) } } }, InfoBox.prototype.setBoxStyle_ = function () { var t, i; if (this.div_) { this.div_.className = this.boxClass_, this.div_.style.cssText = "", i = this.boxStyle_; for (t in i) i.hasOwnProperty(t) && (this.div_.style[t] = i[t]); this.div_.style.WebkitTransform = "translateZ(0)", void 0 !== this.div_.style.opacity && "" != this.div_.style.opacity && (this.div_.style.MsFilter = '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + 100 * this.div_.style.opacity + ')"', this.div_.style.filter = "alpha(opacity=" + 100 * this.div_.style.opacity + ")"), this.div_.style.position = "absolute", this.div_.style.visibility = "hidden", null != this.zIndex_ && (this.div_.style.zIndex = this.zIndex_) } }, InfoBox.prototype.getBoxWidths_ = function () { var t, i = { top: 0, bottom: 0, left: 0, right: 0 }, e = this.div_; return document.defaultView && document.defaultView.getComputedStyle ? (t = e.ownerDocument.defaultView.getComputedStyle(e, "")) && (i.top = parseInt(t.borderTopWidth, 10) || 0, i.bottom = parseInt(t.borderBottomWidth, 10) || 0, i.left = parseInt(t.borderLeftWidth, 10) || 0, i.right = parseInt(t.borderRightWidth, 10) || 0) : document.documentElement.currentStyle && e.currentStyle && (i.top = parseInt(e.currentStyle.borderTopWidth, 10) || 0, i.bottom = parseInt(e.currentStyle.borderBottomWidth, 10) || 0, i.left = parseInt(e.currentStyle.borderLeftWidth, 10) || 0, i.right = parseInt(e.currentStyle.borderRightWidth, 10) || 0), i }, InfoBox.prototype.onRemove = function () { this.div_ && (this.div_.parentNode.removeChild(this.div_), this.div_ = null) }, InfoBox.prototype.draw = function () { this.createInfoBoxDiv_(); var t = this.getProjection().fromLatLngToDivPixel(this.position_); this.div_.style.left = t.x + this.pixelOffset_.width + "px", this.alignBottom_ ? this.div_.style.bottom = -(t.y + this.pixelOffset_.height) + "px" : this.div_.style.top = t.y + this.pixelOffset_.height + "px", this.isHidden_ ? this.div_.style.visibility = "hidden" : this.div_.style.visibility = "visible" }, InfoBox.prototype.setOptions = function (t) { void 0 !== t.boxClass && (this.boxClass_ = t.boxClass, this.setBoxStyle_()), void 0 !== t.boxStyle && (this.boxStyle_ = t.boxStyle, this.setBoxStyle_()), void 0 !== t.content && this.setContent(t.content), void 0 !== t.disableAutoPan && (this.disableAutoPan_ = t.disableAutoPan), void 0 !== t.maxWidth && (this.maxWidth_ = t.maxWidth), void 0 !== t.pixelOffset && (this.pixelOffset_ = t.pixelOffset), void 0 !== t.alignBottom && (this.alignBottom_ = t.alignBottom), void 0 !== t.position && this.setPosition(t.position), void 0 !== t.zIndex && this.setZIndex(t.zIndex), void 0 !== t.closeBoxMargin && (this.closeBoxMargin_ = t.closeBoxMargin), void 0 !== t.closeBoxURL && (this.closeBoxURL_ = t.closeBoxURL), void 0 !== t.infoBoxClearance && (this.infoBoxClearance_ = t.infoBoxClearance), void 0 !== t.isHidden && (this.isHidden_ = t.isHidden), void 0 !== t.visible && (this.isHidden_ = !t.visible), void 0 !== t.enableEventPropagation && (this.enableEventPropagation_ = t.enableEventPropagation), this.div_ && this.draw() }, InfoBox.prototype.setContent = function (t) { this.content_ = t, this.div_ && (this.closeListener_ && (google.maps.event.removeListener(this.closeListener_), this.closeListener_ = null), this.fixedWidthSet_ || (this.div_.style.width = ""), void 0 === t.nodeType ? this.div_.innerHTML = this.getCloseBoxImg_() + t : (this.div_.innerHTML = this.getCloseBoxImg_(), this.div_.appendChild(t)), this.fixedWidthSet_ || (this.div_.style.width = this.div_.offsetWidth + "px", void 0 === t.nodeType ? this.div_.innerHTML = this.getCloseBoxImg_() + t : (this.div_.innerHTML = this.getCloseBoxImg_(), this.div_.appendChild(t))), this.addClickHandler_()), google.maps.event.trigger(this, "content_changed") }, InfoBox.prototype.setPosition = function (t) { this.position_ = t, this.div_ && this.draw(), google.maps.event.trigger(this, "position_changed") }, InfoBox.prototype.setZIndex = function (t) { this.zIndex_ = t, this.div_ && (this.div_.style.zIndex = t), google.maps.event.trigger(this, "zindex_changed") }, InfoBox.prototype.setVisible = function (t) { this.isHidden_ = !t, this.div_ && (this.div_.style.visibility = this.isHidden_ ? "hidden" : "visible") }, InfoBox.prototype.getContent = function () { return this.content_ }, InfoBox.prototype.getPosition = function () { return this.position_ }, InfoBox.prototype.getZIndex = function () { return this.zIndex_ }, InfoBox.prototype.getVisible = function () { return void 0 !== this.getMap() && null !== this.getMap() && !this.isHidden_ }, InfoBox.prototype.show = function () { this.isHidden_ = !1, this.div_ && (this.div_.style.visibility = "visible") }, InfoBox.prototype.hide = function () { this.isHidden_ = !0, this.div_ && (this.div_.style.visibility = "hidden") }, InfoBox.prototype.open = function (t, i) { var e = this; i && (this.position_ = i.getPosition(), this.moveListener_ = google.maps.event.addListener(i, "position_changed", function () { e.setPosition(this.getPosition()) })), this.setMap(t), this.div_ && this.panBox_() }, InfoBox.prototype.close = function () { var t; if (this.closeListener_ && (google.maps.event.removeListener(this.closeListener_), this.closeListener_ = null), this.eventListeners_) { for (t = 0; t < this.eventListeners_.length; t++) google.maps.event.removeListener(this.eventListeners_[t]); this.eventListeners_ = null } this.moveListener_ && (google.maps.event.removeListener(this.moveListener_), this.moveListener_ = null), this.contextListener_ && (google.maps.event.removeListener(this.contextListener_), this.contextListener_ = null), this.setMap(null) };
    //  Cluster ------------------
    function ClusterIcon(a, b) { a.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView), this.cluster_ = a, this.className_ = a.getMarkerClusterer().getClusterClass(), this.styles_ = b, this.center_ = null, this.div_ = null, this.sums_ = null, this.visible_ = !1, this.setMap(a.getMap()) } function Cluster(a) { this.markerClusterer_ = a, this.map_ = a.getMap(), this.gridSize_ = a.getGridSize(), this.minClusterSize_ = a.getMinimumClusterSize(), this.averageCenter_ = a.getAverageCenter(), this.markers_ = [], this.center_ = null, this.bounds_ = null, this.clusterIcon_ = new ClusterIcon(this, a.getStyles()) } function MarkerClusterer(a, b, c) { this.extend(MarkerClusterer, google.maps.OverlayView), b = b || [], c = c || {}, this.markers_ = [], this.clusters_ = [], this.listeners_ = [], this.activeMap_ = null, this.ready_ = !1, this.gridSize_ = c.gridSize || 60, this.minClusterSize_ = c.minimumClusterSize || 2, this.maxZoom_ = c.maxZoom || null, this.styles_ = c.styles || [], this.title_ = c.title || "", this.zoomOnClick_ = !0, void 0 !== c.zoomOnClick && (this.zoomOnClick_ = c.zoomOnClick), this.averageCenter_ = !1, void 0 !== c.averageCenter && (this.averageCenter_ = c.averageCenter), this.ignoreHidden_ = !1, void 0 !== c.ignoreHidden && (this.ignoreHidden_ = c.ignoreHidden), this.enableRetinaIcons_ = !1, void 0 !== c.enableRetinaIcons && (this.enableRetinaIcons_ = c.enableRetinaIcons), this.imagePath_ = c.imagePath || MarkerClusterer.IMAGE_PATH, this.imageExtension_ = c.imageExtension || MarkerClusterer.IMAGE_EXTENSION, this.imageSizes_ = c.imageSizes || MarkerClusterer.IMAGE_SIZES, this.calculator_ = c.calculator || MarkerClusterer.CALCULATOR, this.batchSize_ = c.batchSize || MarkerClusterer.BATCH_SIZE, this.batchSizeIE_ = c.batchSizeIE || MarkerClusterer.BATCH_SIZE_IE, this.clusterClass_ = c.clusterClass || "cluster", navigator.userAgent.toLowerCase().indexOf("msie") !== -1 && (this.batchSize_ = this.batchSizeIE_), this.setupStyles_(), this.addMarkers(b, !0), this.setMap(a) } ClusterIcon.prototype.onAdd = function () { var b, c, a = this; this.div_ = document.createElement("div"), this.div_.className = this.className_, this.visible_ && this.show(), this.getPanes().overlayMouseTarget.appendChild(this.div_), this.boundsChangedListener_ = google.maps.event.addListener(this.getMap(), "bounds_changed", function () { c = b }), google.maps.event.addDomListener(this.div_, "mousedown", function () { b = !0, c = !1 }), google.maps.event.addDomListener(this.div_, "click", function (d) { if (b = !1, !c) { var e, f, g = a.cluster_.getMarkerClusterer(); google.maps.event.trigger(g, "click", a.cluster_), google.maps.event.trigger(g, "clusterclick", a.cluster_), g.getZoomOnClick() && (f = g.getMaxZoom(), e = a.cluster_.getBounds(), g.getMap().fitBounds(e), setTimeout(function () { g.getMap().fitBounds(e), null !== f && g.getMap().getZoom() > f && g.getMap().setZoom(f + 1) }, 100)), d.cancelBubble = !0, d.stopPropagation && d.stopPropagation() } }), google.maps.event.addDomListener(this.div_, "mouseover", function () { var b = a.cluster_.getMarkerClusterer(); google.maps.event.trigger(b, "mouseover", a.cluster_) }), google.maps.event.addDomListener(this.div_, "mouseout", function () { var b = a.cluster_.getMarkerClusterer(); google.maps.event.trigger(b, "mouseout", a.cluster_) }) }, ClusterIcon.prototype.onRemove = function () { this.div_ && this.div_.parentNode && (this.hide(), google.maps.event.removeListener(this.boundsChangedListener_), google.maps.event.clearInstanceListeners(this.div_), this.div_.parentNode.removeChild(this.div_), this.div_ = null) }, ClusterIcon.prototype.draw = function () { if (this.visible_) { var a = this.getPosFromLatLng_(this.center_); this.div_.style.top = a.y + "px", this.div_.style.left = a.x + "px" } }, ClusterIcon.prototype.hide = function () { this.div_ && (this.div_.style.display = "none"), this.visible_ = !1 }, ClusterIcon.prototype.show = function () { if (this.div_) { var a = "", b = this.backgroundPosition_.split(" "), c = parseInt(b[0].replace(/^\s+|\s+$/g, ""), 10), d = parseInt(b[1].replace(/^\s+|\s+$/g, ""), 10), e = this.getPosFromLatLng_(this.center_); this.div_.style.cssText = this.createCss(e), a = "<img src='" + this.url_ + "' style='position: absolute; top: " + d + "px; left: " + c + "px; ", this.cluster_.getMarkerClusterer().enableRetinaIcons_ || (a += "clip: rect(" + -1 * d + "px, " + (-1 * c + this.width_) + "px, " + (-1 * d + this.height_) + "px, " + -1 * c + "px);"), a += "'>", this.div_.innerHTML = a + "<div class='cluster' style='position: absolute;top: " + this.anchorText_[0] + "px;left: " + this.anchorText_[1] + "px;color: " + this.textColor_ + ";font-size: " + this.textSize_ + "px;font-family: " + this.fontFamily_ + ";font-weight: " + this.fontWeight_ + ";font-style: " + this.fontStyle_ + ";text-decoration: " + this.textDecoration_ + ";text-align: center;width: " + this.width_ + "px;line-height:" + this.height_ + "px;'>" + this.sums_.text + "</div>", "undefined" == typeof this.sums_.title || "" === this.sums_.title ? this.div_.title = this.cluster_.getMarkerClusterer().getTitle() : this.div_.title = this.sums_.title, this.div_.style.display = "" } this.visible_ = !0 }, ClusterIcon.prototype.useStyle = function (a) { this.sums_ = a; var b = Math.max(0, a.index - 1); b = Math.min(this.styles_.length - 1, b); var c = this.styles_[b]; this.url_ = c.url, this.height_ = c.height, this.width_ = c.width, this.anchorText_ = c.anchorText || [0, 0], this.anchorIcon_ = c.anchorIcon || [parseInt(this.height_ / 2, 10), parseInt(this.width_ / 2, 10)], this.textColor_ = c.textColor || "black", this.textSize_ = c.textSize || 11, this.textDecoration_ = c.textDecoration || "none", this.fontWeight_ = c.fontWeight || "bold", this.fontStyle_ = c.fontStyle || "normal", this.fontFamily_ = c.fontFamily || "Arial,sans-serif", this.backgroundPosition_ = c.backgroundPosition || "0 0" }, ClusterIcon.prototype.setCenter = function (a) { this.center_ = a }, ClusterIcon.prototype.createCss = function (a) { var b = []; return b.push("cursor: pointer;"), b.push("position: absolute; top: " + a.y + "px; left: " + a.x + "px;"), b.push("width: " + this.width_ + "px; height: " + this.height_ + "px;"), b.join("") }, ClusterIcon.prototype.getPosFromLatLng_ = function (a) { var b = this.getProjection().fromLatLngToDivPixel(a); return b.x -= this.anchorIcon_[1], b.y -= this.anchorIcon_[0], b.x = parseInt(b.x, 10), b.y = parseInt(b.y, 10), b }, Cluster.prototype.getSize = function () { return this.markers_.length }, Cluster.prototype.getMarkers = function () { return this.markers_ }, Cluster.prototype.getCenter = function () { return this.center_ }, Cluster.prototype.getMap = function () { return this.map_ }, Cluster.prototype.getMarkerClusterer = function () { return this.markerClusterer_ }, Cluster.prototype.getBounds = function () { var a, b = new google.maps.LatLngBounds(this.center_, this.center_), c = this.getMarkers(); for (a = 0; a < c.length; a++) b.extend(c[a].getPosition()); return b }, Cluster.prototype.remove = function () { this.clusterIcon_.setMap(null), this.markers_ = [], delete this.markers_ }, Cluster.prototype.addMarker = function (a) { var b, c, d; if (this.isMarkerAlreadyAdded_(a)) return !1; if (this.center_) { if (this.averageCenter_) { var e = this.markers_.length + 1, f = (this.center_.lat() * (e - 1) + a.getPosition().lat()) / e, g = (this.center_.lng() * (e - 1) + a.getPosition().lng()) / e; this.center_ = new google.maps.LatLng(f, g), this.calculateBounds_() } } else this.center_ = a.getPosition(), this.calculateBounds_(); if (a.isAdded = !0, this.markers_.push(a), c = this.markers_.length, d = this.markerClusterer_.getMaxZoom(), null !== d && this.map_.getZoom() > d) a.getMap() !== this.map_ && a.setMap(this.map_); else if (c < this.minClusterSize_) a.getMap() !== this.map_ && a.setMap(this.map_); else if (c === this.minClusterSize_) for (b = 0; b < c; b++) this.markers_[b].setMap(null); else a.setMap(null); return this.updateIcon_(), !0 }, Cluster.prototype.isMarkerInClusterBounds = function (a) { return this.bounds_.contains(a.getPosition()) }, Cluster.prototype.calculateBounds_ = function () { var a = new google.maps.LatLngBounds(this.center_, this.center_); this.bounds_ = this.markerClusterer_.getExtendedBounds(a) }, Cluster.prototype.updateIcon_ = function () { var a = this.markers_.length, b = this.markerClusterer_.getMaxZoom(); if (null !== b && this.map_.getZoom() > b) return void this.clusterIcon_.hide(); if (a < this.minClusterSize_) return void this.clusterIcon_.hide(); var c = this.markerClusterer_.getStyles().length, d = this.markerClusterer_.getCalculator()(this.markers_, c); this.clusterIcon_.setCenter(this.center_), this.clusterIcon_.useStyle(d), this.clusterIcon_.show() }, Cluster.prototype.isMarkerAlreadyAdded_ = function (a) { var b; if (this.markers_.indexOf) return this.markers_.indexOf(a) !== -1; for (b = 0; b < this.markers_.length; b++) if (a === this.markers_[b]) return !0; return !1 }, MarkerClusterer.prototype.onAdd = function () { var a = this; this.activeMap_ = this.getMap(), this.ready_ = !0, this.repaint(), this.listeners_ = [google.maps.event.addListener(this.getMap(), "zoom_changed", function () { a.resetViewport_(!1), this.getZoom() !== (this.get("minZoom") || 0) && this.getZoom() !== this.get("maxZoom") || google.maps.event.trigger(this, "idle") }), google.maps.event.addListener(this.getMap(), "idle", function () { a.redraw_() })] }, MarkerClusterer.prototype.onRemove = function () { var a; for (a = 0; a < this.markers_.length; a++) this.markers_[a].getMap() !== this.activeMap_ && this.markers_[a].setMap(this.activeMap_); for (a = 0; a < this.clusters_.length; a++) this.clusters_[a].remove(); for (this.clusters_ = [], a = 0; a < this.listeners_.length; a++) google.maps.event.removeListener(this.listeners_[a]); this.listeners_ = [], this.activeMap_ = null, this.ready_ = !1 }, MarkerClusterer.prototype.draw = function () { }, MarkerClusterer.prototype.setupStyles_ = function () { var a, b; if (!(this.styles_.length > 0)) for (a = 0; a < this.imageSizes_.length; a++) b = this.imageSizes_[a], this.styles_.push({ url: this.imagePath_ + (a + 1) + "." + this.imageExtension_, height: b, width: b }) }, MarkerClusterer.prototype.fitMapToMarkers = function () { var a, b = this.getMarkers(), c = new google.maps.LatLngBounds; for (a = 0; a < b.length; a++) c.extend(b[a].getPosition()); this.getMap().fitBounds(c) }, MarkerClusterer.prototype.getGridSize = function () { return this.gridSize_ }, MarkerClusterer.prototype.setGridSize = function (a) { this.gridSize_ = a }, MarkerClusterer.prototype.getMinimumClusterSize = function () { return this.minClusterSize_ }, MarkerClusterer.prototype.setMinimumClusterSize = function (a) { this.minClusterSize_ = a }, MarkerClusterer.prototype.getMaxZoom = function () { return this.maxZoom_ }, MarkerClusterer.prototype.setMaxZoom = function (a) { this.maxZoom_ = a }, MarkerClusterer.prototype.getStyles = function () { return this.styles_ }, MarkerClusterer.prototype.setStyles = function (a) { this.styles_ = a }, MarkerClusterer.prototype.getTitle = function () { return this.title_ }, MarkerClusterer.prototype.setTitle = function (a) { this.title_ = a }, MarkerClusterer.prototype.getZoomOnClick = function () { return this.zoomOnClick_ }, MarkerClusterer.prototype.setZoomOnClick = function (a) { this.zoomOnClick_ = a }, MarkerClusterer.prototype.getAverageCenter = function () { return this.averageCenter_ }, MarkerClusterer.prototype.setAverageCenter = function (a) { this.averageCenter_ = a }, MarkerClusterer.prototype.getIgnoreHidden = function () { return this.ignoreHidden_ }, MarkerClusterer.prototype.setIgnoreHidden = function (a) { this.ignoreHidden_ = a }, MarkerClusterer.prototype.getEnableRetinaIcons = function () { return this.enableRetinaIcons_ }, MarkerClusterer.prototype.setEnableRetinaIcons = function (a) { this.enableRetinaIcons_ = a }, MarkerClusterer.prototype.getImageExtension = function () { return this.imageExtension_ }, MarkerClusterer.prototype.setImageExtension = function (a) { this.imageExtension_ = a }, MarkerClusterer.prototype.getImagePath = function () { return this.imagePath_ }, MarkerClusterer.prototype.setImagePath = function (a) { this.imagePath_ = a }, MarkerClusterer.prototype.getImageSizes = function () { return this.imageSizes_ }, MarkerClusterer.prototype.setImageSizes = function (a) { this.imageSizes_ = a }, MarkerClusterer.prototype.getCalculator = function () { return this.calculator_ }, MarkerClusterer.prototype.setCalculator = function (a) { this.calculator_ = a }, MarkerClusterer.prototype.getBatchSizeIE = function () { return this.batchSizeIE_ }, MarkerClusterer.prototype.setBatchSizeIE = function (a) { this.batchSizeIE_ = a }, MarkerClusterer.prototype.getClusterClass = function () { return this.clusterClass_ }, MarkerClusterer.prototype.setClusterClass = function (a) { this.clusterClass_ = a }, MarkerClusterer.prototype.getMarkers = function () { return this.markers_ }, MarkerClusterer.prototype.getTotalMarkers = function () { return this.markers_.length }, MarkerClusterer.prototype.getClusters = function () { return this.clusters_ }, MarkerClusterer.prototype.getTotalClusters = function () { return this.clusters_.length }, MarkerClusterer.prototype.addMarker = function (a, b) { this.pushMarkerTo_(a), b || this.redraw_() }, MarkerClusterer.prototype.addMarkers = function (a, b) { var c; for (c in a) a.hasOwnProperty(c) && this.pushMarkerTo_(a[c]); b || this.redraw_() }, MarkerClusterer.prototype.pushMarkerTo_ = function (a) { if (a.getDraggable()) { var b = this; google.maps.event.addListener(a, "dragend", function () { b.ready_ && (this.isAdded = !1, b.repaint()) }) } a.isAdded = !1, this.markers_.push(a) }, MarkerClusterer.prototype.removeMarker = function (a, b) { var c = this.removeMarker_(a); return !b && c && this.repaint(), c }, MarkerClusterer.prototype.removeMarkers = function (a, b) { var c, d, e = !1; for (c = 0; c < a.length; c++) d = this.removeMarker_(a[c]), e = e || d; return !b && e && this.repaint(), e }, MarkerClusterer.prototype.removeMarker_ = function (a) { var b, c = -1; if (this.markers_.indexOf) c = this.markers_.indexOf(a); else for (b = 0; b < this.markers_.length; b++) if (a === this.markers_[b]) { c = b; break } return c !== -1 && (a.setMap(null), this.markers_.splice(c, 1), !0) }, MarkerClusterer.prototype.clearMarkers = function () { this.resetViewport_(!0), this.markers_ = [] }, MarkerClusterer.prototype.repaint = function () { var a = this.clusters_.slice(); this.clusters_ = [], this.resetViewport_(!1), this.redraw_(), setTimeout(function () { var b; for (b = 0; b < a.length; b++) a[b].remove() }, 0) }, MarkerClusterer.prototype.getExtendedBounds = function (a) { var b = this.getProjection(), c = new google.maps.LatLng(a.getNorthEast().lat(), a.getNorthEast().lng()), d = new google.maps.LatLng(a.getSouthWest().lat(), a.getSouthWest().lng()), e = b.fromLatLngToDivPixel(c); e.x += this.gridSize_, e.y -= this.gridSize_; var f = b.fromLatLngToDivPixel(d); f.x -= this.gridSize_, f.y += this.gridSize_; var g = b.fromDivPixelToLatLng(e), h = b.fromDivPixelToLatLng(f); return a.extend(g), a.extend(h), a }, MarkerClusterer.prototype.redraw_ = function () { this.createClusters_(0) }, MarkerClusterer.prototype.resetViewport_ = function (a) { var b, c; for (b = 0; b < this.clusters_.length; b++) this.clusters_[b].remove(); for (this.clusters_ = [], b = 0; b < this.markers_.length; b++) c = this.markers_[b], c.isAdded = !1, a && c.setMap(null) }, MarkerClusterer.prototype.distanceBetweenPoints_ = function (a, b) { var c = 6371, d = (b.lat() - a.lat()) * Math.PI / 180, e = (b.lng() - a.lng()) * Math.PI / 180, f = Math.sin(d / 2) * Math.sin(d / 2) + Math.cos(a.lat() * Math.PI / 180) * Math.cos(b.lat() * Math.PI / 180) * Math.sin(e / 2) * Math.sin(e / 2), g = 2 * Math.atan2(Math.sqrt(f), Math.sqrt(1 - f)), h = c * g; return h }, MarkerClusterer.prototype.isMarkerInBounds_ = function (a, b) { return b.contains(a.getPosition()) }, MarkerClusterer.prototype.addToClosestCluster_ = function (a) { var b, c, d, e, f = 4e4, g = null; for (b = 0; b < this.clusters_.length; b++) d = this.clusters_[b], e = d.getCenter(), e && (c = this.distanceBetweenPoints_(e, a.getPosition()), c < f && (f = c, g = d)); g && g.isMarkerInClusterBounds(a) ? g.addMarker(a) : (d = new Cluster(this), d.addMarker(a), this.clusters_.push(d)) }, MarkerClusterer.prototype.createClusters_ = function (a) { var b, c, d, e = this; if (this.ready_) { 0 === a && (google.maps.event.trigger(this, "clusteringbegin", this), "undefined" != typeof this.timerRefStatic && (clearTimeout(this.timerRefStatic), delete this.timerRefStatic)), d = this.getMap().getZoom() > 3 ? new google.maps.LatLngBounds(this.getMap().getBounds().getSouthWest(), this.getMap().getBounds().getNorthEast()) : new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472, -178.48388434375), new google.maps.LatLng(-85.08136444384544, 178.00048865625)); var f = this.getExtendedBounds(d), g = Math.min(a + this.batchSize_, this.markers_.length); for (b = a; b < g; b++) c = this.markers_[b], !c.isAdded && this.isMarkerInBounds_(c, f) && (!this.ignoreHidden_ || this.ignoreHidden_ && c.getVisible()) && this.addToClosestCluster_(c); g < this.markers_.length ? this.timerRefStatic = setTimeout(function () { e.createClusters_(g) }, 0) : (delete this.timerRefStatic, google.maps.event.trigger(this, "clusteringend", this)) } }, MarkerClusterer.prototype.extend = function (a, b) { return function (a) { var b; for (b in a.prototype) this.prototype[b] = a.prototype[b]; return this }.apply(a, [b]) }, MarkerClusterer.CALCULATOR = function (a, b) { for (var c = 0, d = "", e = a.length.toString(), f = e; 0 !== f;) f = parseInt(f / 10, 10), c++; return c = Math.min(c, b), { text: e, index: c, title: d } }, MarkerClusterer.BATCH_SIZE = 2e3, MarkerClusterer.BATCH_SIZE_IE = 500, MarkerClusterer.IMAGE_PATH = "../images/m", MarkerClusterer.IMAGE_EXTENSION = "png", MarkerClusterer.IMAGE_SIZES = [53, 56, 66, 78, 90];
 

    "use strict";
    var markerIcon = {
        anchor: new google.maps.Point(12, 0),
        url: 'images/marker.png',
        labelOrigin: new google.maps.Point(25, 20)
    }





    //Get Hotel Info
        var locations = [];
        $('#list-group-wrap.ui-listing-wrapper .item').each(function (index) {
            $(this).find('.map-item').attr('href', '#' + index);

            var data = {};

            data.title = $(this).data('title');
            data.lat = $(this).data('lat');
            data.long = $(this).data('long');
            data.hotelimage = $(this).data('imageurl');
            data.totalprice = $(this).data('totalprice');
            data.hotelcode = $(this).data('hotelcode');
            data.sessionid = $(this).data('sessionid');
            data.rating = $(this).find('#divrating-' + index).attr('class');

            locations.push(data);
        })




        var bounds = new google.maps.LatLngBounds();

        var map = new google.maps.Map(document.getElementById('map-main'), {
            zoom: 10,
            scrollwheel: false,
            center: new google.maps.LatLng(40.8, -73.90),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            panControl: false,
            fullscreenControl: true,
            navigationControl: false,
            streetViewControl: false,
            animation: google.maps.Animation.BOUNCE,
            gestureHandling: 'cooperative',
			styles: [	
             
				{
                    "featureType": "poi.medical",
                    "stylers": [{
                        "visibility": "off"
                    }],
				},
                {
                    "featureType": "poi.place_of_worship",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }
           ]
            //styles: [{
            //        "featureType": "poi.attraction",
            //        "stylers": [{
            //            "visibility": "off"
            //        }]
            //    },
            //    {
            //        "featureType": "poi.business",
            //        "stylers": [{
            //            "visibility": "off"
            //        }]
            //    },
            //    {
            //        "featureType": "poi.medical",
            //        "stylers": [{
            //            "visibility": "off"
            //        }]
            //    },
            //    {
            //        "featureType": "poi.place_of_worship",
            //        "stylers": [{
            //            "visibility": "off"
            //        }]
            //    },
            //    {
            //        "featureType": "poi.school",
            //        "stylers": [{
            //            "visibility": "off"
            //        }]
            //    },
            //    {
            //        "featureType": "transit.station.bus",
            //        "stylers": [{
            //            "visibility": "off"
            //        }]

            //    }
            //]
        });


        var boxText = document.createElement("div");
        boxText.className = 'map-box'
        var currentInfobox;
        var boxOptions = {
            content: boxText,
            disableAutoPan: true,
            alignBottom: true,
            maxWidth: 0,
            pixelOffset: new google.maps.Size(-110, -55),
            zIndex: null,
            boxStyle: {
                width: "260px"
            },
            closeBoxMargin: "0",
            closeBoxURL: "",
            infoBoxClearance: new google.maps.Size(1, 1),
            isHidden: false,
            pane: "floatPane",
            enableEventPropagation: false,
        };

        var markerCluster, marker, i;
        var allMarkers = [];
        var clusterStyles = [{
            textColor: 'white',
            url: '',
            height: 50,
            width: 50
        }];



        for (i = 0; i < locations.length; i++) {

            var labels = '123456789';
            var text = locations[i].totalprice;

            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i].lat, locations[i].long),
                icon: 'images/marker.png',
                id: i,
                label: {
                    text: "" + (text),
                    color: "#fff",
                    fontSize: "10px",
                    fontWeight: "bold"
                }
            });
            
            bounds.extend(marker.position);         


            allMarkers.push(marker);
            var ib = new InfoBox();
            google.maps.event.addListener(ib, "domready", function () {
                cardRaining()
            });
            google.maps.event.addListener(marker, 'click', (function (marker, i) {

                var boxContent = '<div class="map-popup-wrap"><div class="map-popup"><div class="infoBox-close"><i class="icon icon-close"></i></div><a href="javascript:void(0);" onclick="SelectRoom(\'' + locations[i].hotelcode + '\',\'' + locations[i].sessionid + '\')" class="listing-img-content fl-wrap"><img src="' + locations[i].hotelimage + '" alt=""></a> <div class="listing-content fl-wrap"><div class="listing-title fl-wrap"><h4><a href=' + locations[i].title + '>' + locations[i].title + '</a></h4><div class="' + locations[i].rating + '"></div><button class="btn btn-primary font-weight-bold" onclick="SelectRoom(\'' + locations[i].hotelcode + '\',\'' + locations[i].sessionid + '\')">' + locations[i].totalprice + '</button></div></div></div></div>';

                return function () {
                    ib.setOptions(boxOptions);
                    boxText.innerHTML = boxContent;
                    ib.close();
                    ib.open(map, marker);
                    currentInfobox = marker.id;
                    var latLng = new google.maps.LatLng(locations[i].lat, locations[i].long);
                    map.panTo(latLng);
                    map.panBy(0, -50);
                    google.maps.event.addListener(ib, 'domready', function () {
                        $('.infoBox-close').click(function (e) {
                            e.preventDefault();
                            ib.close();
                        });
                    });
                }
            })(marker, i));

            map.fitBounds(bounds);
        }

        var options2 = {
            imagePath: 'images/',
            styles: clusterStyles,
            minClusterSize: 2,
        };
        markerCluster = new MarkerClusterer(map, allMarkers, options2);
        google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
           
        });
        if ($(".controls-mapwn").length) {
            var input = document.getElementById('pac-input');
            var searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            map.addListener('bounds_changed', function () {
                searchBox.setBounds(map.getBounds());
            });
            var markers = [];
            searchBox.addListener('places_changed', function () {
                var places = searchBox.getPlaces();

                if (places.length == 0) {
                    return;
                }
                markers.forEach(function (marker) {
                    marker.setMap(null);
                });
                markers = [];

                var bounds = new google.maps.LatLngBounds();
                places.forEach(function (place) {
                    if (!place.geometry) {
                        console.log("Returned place contains no geometry");
                        return;
                    }
                    var icon = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    };
                    markers.push(new google.maps.Marker({
                        map: map,
                        icon: icon,
                        title: place.name,
                        position: place.geometry.location
                    }));

                    if (place.geometry.viewport) {
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                map.fitBounds(bounds);
            });
        }

        $('.map-item').on("click", function (e) {
            e.preventDefault();
            map.setZoom(15);
            var index = currentInfobox;
            var marker_index = parseInt($(this).attr('href').split('#')[1], 10);
            google.maps.event.trigger(allMarkers[marker_index], "click");
            if ($(window).width() > 1064) {
                if ($(".map-container").hasClass("fw-map")) {
                    $('html, body').animate({
                        scrollTop: $(".map-container").offset().top + "-110px"
                    }, 1000)
                    return false;
                }
            }
        });
        $('.nextmap-nav').on("click", function (e) {
            e.preventDefault();
            map.setZoom(15);
            var index = currentInfobox;
            if (index + 1 < allMarkers.length) {
                google.maps.event.trigger(allMarkers[index + 1], 'click');
            } else {
                google.maps.event.trigger(allMarkers[0], 'click');
            }
        });
        $('.prevmap-nav').on("click", function (e) {
            e.preventDefault();
            map.setZoom(15);
            if (typeof (currentInfobox) == "undefined") {
                google.maps.event.trigger(allMarkers[allMarkers.length - 1], 'click');
            } else {
                var index = currentInfobox;
                if (index - 1 < 0) {
                    google.maps.event.trigger(allMarkers[allMarkers.length - 1], 'click');
                } else {
                    google.maps.event.trigger(allMarkers[index - 1], 'click');
                }
            }
        });

        var zoomControlDiv = document.createElement('div');
        var zoomControl = new ZoomControl(zoomControlDiv, map);
        function ZoomControl(controlDiv, map) {
            zoomControlDiv.index = 1;
            map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(zoomControlDiv);
            controlDiv.style.padding = '5px';
            var controlWrapper = document.createElement('div');
            controlDiv.appendChild(controlWrapper);
            var zoomInButton = document.createElement('div');
            zoomInButton.className = "mapzoom-in";
            controlWrapper.appendChild(zoomInButton);
            var zoomOutButton = document.createElement('div');
            zoomOutButton.className = "mapzoom-out";
            controlWrapper.appendChild(zoomOutButton);
            google.maps.event.addDomListener(zoomInButton, 'click', function () {
                map.setZoom(map.getZoom() + 1);
            });
            google.maps.event.addDomListener(zoomOutButton, 'click', function () {
                map.setZoom(map.getZoom() - 1);
            });
        }       

    }

