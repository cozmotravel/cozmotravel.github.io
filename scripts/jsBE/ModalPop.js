// JScript File for Modal Popup.
var __ModalPop = function()
{
    this.rendered = false;
    this.MaskBG = document.createElement("div");
    this.IShim = document.createElement("iframe");
    this.Container = document.createElement("div");
    this.Box = document.createElement("div");
    this.MessageBox = document.createElement("div");
    this.ControlBox = document.createElement("div");
    this.AcceptButton = document.createElement("input");
    this.DenyButton = document.createElement("input");
    this.MaskBG.className = "modalBG";
    this.MaskBG.style.display = "none";
    this.IShim.className = "modalIShim";
    this.IShim.style.display = "none";
    this.Container.className = "modalShadow";
    this.Container.style.display = "none";
    this.Box.className = "modalBox";
    this.MessageBox.className = "modalMessage";
    this.MessageBox.innerHTML = "";
    this.ControlBox.className = "modalControl";
    this.AcceptButton.type = "button";
    this.AcceptButton.value = " Yes ";
    this.AcceptButton.className = "modalButton";
    this.ControlBox.appendChild(this.AcceptButton);
    this.DenyButton.type = "button";
    this.DenyButton.value = " No ";
    this.DenyButton.className = "modalButton";
    this.ControlBox.appendChild(this.DenyButton);
    this.Box.appendChild(this.MessageBox);
    this.Box.appendChild(this.ControlBox);
    this.Container.appendChild(this.Box);
    this.eventOnTrue = null;
    this.eventOnFalse = null;
    this.size = null;
    var browser = new Browser();
    var ie6 = false;
    if(browser.isIE && browser.version == 6)
    {
        ie6 = true;
    }
    this.Hide = function()
    {
        ModalPop.Container.style.display = "none";
        ModalPop.MaskBG.style.display = "none";
        if(ie6)
        {
            ModalPop.IShim.style.display = "none";
        }
        if (window.detachEvent)
        {
		    window.detachEvent('onresize', this.OnWindowResize);
		}
	    else if (window.removeEventListener)
	    {
		    window.removeEventListener('resize', this.OnWindowResize, false);
		}
	    else
	    {
		    window.onresize = null;
		}
    }
    this.Action = function()
    {
        ModalPop.Hide();
        if(ModalPop.eventOnTrue)
        {
            ModalPop.eventOnTrue();
        }
    };
    this.NoAction = function()
    {
        ModalPop.Hide();
        if(ModalPop.eventOnFalse)
        {
            ModalPop.eventOnFalse();
        }
    };
    this.AcceptButton.onclick = this.Action;
    this.DenyButton.onclick = this.NoAction;
    this.OnWindowResize = function()
    {
	    var left = ie6 ? document.documentElement.scrollLeft : 0;
	    var top = ie6 ? document.documentElement.scrollTop : 0;
	    var div = ModalPop.Container;
	    var winSize = GetWindowSize();
	    left += (winSize.x - ModalPop.size.x) / 2;
	    top += (winSize.y - ModalPop.size.y) / 2;
	    div.style.left = Math.max(left, 0) + 'px';
	    div.style.top = Math.max(top, 0) + 'px';
    };
    this.Show = function(size, message, eventOnTrue, eventOnFalse)
    {
        if(!this.rendered)
        {
            document.body.appendChild(this.Container);
            this.Box.style.width = (size.x - 2) + "px";
            this.Box.style.height = (size.y - 2) + "px";
            this.Container.style.width = size.x + "px";
            this.Container.style.height = size.y + "px";
            this.MessageBox.style.width = (size.x - 32) + "px";
            this.size = size;
            document.body.appendChild(this.MaskBG);
            if(ie6)
            {
                document.body.appendChild(this.IShim);
		        document.documentElement.onscroll = this.OnWindowResize
            }
            this.OnWindowResize();
            this.rendered = true;
        }
        if (window.attachEvent)
        {
	        window.attachEvent('onresize', this.OnWindowResize);
	    }
        else if (window.addEventListener)
        {
	        window.addEventListener('resize', this.OnWindowResize, false);
	    }
        else
        {
	        window.onresize = this.OnWindowResize;
	    }
        this.Container.style.display = "block";
        this.MaskBG.style.display = "block";
        this.IShim.style.display = "block";
        this.eventOnTrue = eventOnTrue;
        this.eventOnFalse = eventOnFalse;
        this.Action.Parent = this;
        if(message)
        {
            this.MessageBox.innerHTML = message;
        }
    };
};

var ModalPop = new __ModalPop();

