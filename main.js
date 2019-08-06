var started = false;
// document.body.onclick = 
(function() {
	if(started) return;
	// alert('Hello');
	var body = document.getElementsByTagName('body')[0],
		hero = document.getElementById('hero'),
		stage = document.getElementById('stage'),
		point = document.getElementById('pts'),
		bullets = [],
		villains = [],
		exp = [],
		hx = 0, 
		hy = 0,
		pts = 0,
		maxVil = 4;
	body.addEventListener('mousemove', function (e) {
		// console.log('move');
		hx = (e.pageX - 30);
		hy = (e.pageY - 30);
		// hy = (window.innerHeight-60);
		// console.log(hx)
		hero.style['left'] = hx + 'px';
		hero.style['top'] = hy + 'px';
	});
	body.addEventListener('click', function (e) {
		var bu = document.createElement('bul');
		bu.className = 'bullet';
		bu.style['left'] = hx + 'px';
		bu.style['top'] = hy + 'px';
		bullets.push(bu);
		stage.appendChild(bu);
	});
	for (var i = 0; i < maxVil; i++) {
		var vil = document.createElement('vil');
		vil.className = 'vill';
		vil.style['left'] = Math.floor(Math.random() * (window.innerWidth-60)) + 'px';
		vil.style['top'] =  '-100px';
		villains.push(vil);
		stage.appendChild(vil);
	}
	setInterval(function(){
		// var bullets = document.getElementsByTagName('bul');
		// var villains = document.getElementsByTagName('vil');
		for (var i = 0; i < bullets.length; i++) {
			// console.log('test');
			var btop = parseInt(bullets[i].style['top']);
			var bleft = parseInt(bullets[i].style['left']);
			// console.log(btop);
			if (btop > -60) {
				bullets[i].style['top'] = (btop -10) + 'px';
				// console.dir(bullets);
				for (var j = 0; j < villains.length; j++) {
					if (villains[j].className == 'vill exp') {
						break;
					}
					var vtop  = parseInt(villains[j].style['top']);
					var vleft = parseInt(villains[j].style['left']);
					if (vtop-20 <= btop && vtop+60 >= btop+20) {
						if(vleft-20 <= bleft && vleft+60 >= bleft-20) {
							// clash!!
							console.log('clash!!');
							pts++;
							point.innerHTML = 'POINTS: '+pts;
							exp.push(j);
							villains[j].className = 'vill exp';
							setTimeout(function () {
								var v = villains[exp.shift()];
								v.style['top'] = '-100px';
								v.style['left'] = Math.floor(Math.random() * (window.innerWidth-60)) + 'px';
								v.className = 'vill';
							},500);
							stage.removeChild(bullets[i]);
							bullets[i] = null;
							bullets.splice(i,1);
							// console.log(i);
							// console.dir(bullets);
							i--;
						}
					}
				}
			} else {
				stage.removeChild(bullets[i]);
				bullets.splice(i,1);
				// console.log(i);
				// console.dir(bullets);
				i--;
			}
		}
		for (var i = 0; i < villains.length; i++) {
			var top = parseInt(villains[i].style['top'])
			if (top < (window.innerHeight+60) ) {
				villains[i].style['top'] = (top +5*(i+1)) + 'px';
			} else {
				villains[i].style['top'] = '-100px';
				villains[i].style['left'] = Math.floor(Math.random() * (window.innerWidth-60)) + 'px';
			}
		}
	},40);
})();