import controller from "/-controller/layout.html.js"
import sitemap from "/-sitemap/layout.html.js"
import links from "/-catalog/links.html.js"
import years from "/-words/years.js"
import magicBtn from "/magicBtn.html.js"

export const ROOT = (data, env) => `<!DOCTYPE html>
<html class="mainhtml" lang="ru">
	<head>
		${controller.HEAD(data, env)}
		${sitemap.HEAD(data, env)}
		<base href="/">
		<link rel="stylesheet" href="/-notreset/style.css">
		<link rel="stylesheet" href="/-notreset/table.css">
		<link rel="stylesheet" href="/-float-label/style.css">
		<link rel="stylesheet" href="/-note/style.css">
		
		<link rel="stylesheet" href="/style.css">
		

		<!-- <link rel="icon" type="image/png" href="/images/favicon.png"> -->
		<link rel="icon" type="image/svg+xml" href="/images/favicon.svg">

		
		<script class="ymaps" data-src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=f5c14d71-b532-4b86-8e63-68dfb7141d32"></script>

		<style>
			html {
/*				scroll-behavior: smooth;*/
			}
			body { margin: 0 }
			.sliderNeo::-webkit-scrollbar {
				background-color: var(--lightgrey);
			}
			.sliderNeo::-webkit-scrollbar-thumb {
				background-color: var(--primary);
			}
		</style>
		<style>
			.waitshow {
				opacity: 0;
				transition: opacity 0.5s;
			}
			.waitshow.show {
				opacity: 1;
			}
		</style>
	</head>
	<body>
		<style>
			body {
				min-height: 100vh;
				display:flex; 
				flex-direction: column; 
				justify-content: flex-start; 
			}
			body.overflow_blocked {
				overflow: hidden;
				height: 100vh;
			}
			@media print {
				body #NOTES,
				body footer {
					display: none;
				}
			}
		</style>
		<header style="z-index: 1; 
			position:sticky; top:0; 
			background: rgba(224, 228, 255, 0.60); 
			backdrop-filter: blur(25px);"
			id="HEADER"></header>

		<main style="flex-grow: 1; display: grid" id="MAIN"></main>
		<footer	id="FOOTER"></footer>
	</body>

	<script type="module">//Записать данные значимого перехода
		await import("/-inactive/inActive.js").then(r => r.default)
		const ref = document.referrer ? new URL(document.referrer) : location
		if (ref.host != location.host || !window.sessionStorage.utmvisitstart) {
			const UTM = await import('/-form/UTM.js').then(r => r.default)
			UTM.write()
			window.sessionStorage.utmvisitstart = Date.now()
		}
	</script>



	<script type="module">
		//Событие, что длинная страница долистана до конца
		import hoverViewport from "/-inactive/hoverViewport.js"
		const foot = document.getElementById('FOOTER')
		let ready = false
		hoverViewport(foot, () => {
			if (window.pageYOffset < 2000) return
			if (ready) return
			ready = true
			const metrikaid = window.Ya?._metrika?.getCounters()[0]?.id
			if (!metrikaid) return
			const goal = 'scrolled'
			console.log('Goal.reach ' + goal)
			ym(metrikaid, 'reachGoal', goal);
		})
	</script>
	<script type="module">//Сообщить результаты внесения данных в каталог
		const msg = new URL(location).searchParams.get('alert')
		if (msg) {
			const Dialog = await import('/-dialog/Dialog.js').then(r => r.default)
			Dialog.alert(msg)
		}
	</script>
	<script type="module">//Метрика
		if (!~location.host.indexOf('127.0.0.1')) {
			await import("/-inactive/inActive.js").then(r => r.default);
	
			(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
			m[i].l=1*new Date();
			for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
			k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
			(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
	
			ym(94957675, "init", {
				webvisor:true,
				clickmap:true,
				trackLinks:true,
				accurateTrackBounce:true
			})
	
			let referrer = document.referrer
			window.addEventListener('crossing-sitemap-headready', () => {
				ym(94957675, 'hit', location.href, {referrer, title: document.title})
				referrer = location.href
			})

		}
	</script>
	<script type="module">//Возможность сообщить об ошибке на сайте
		window.addEventListener('keypress', async e => {
			if (!e.ctrlKey || e.code != "Enter") return
			const Grammar = await import('/-grammar').then(r => r.default)
			Grammar.ask()
		})
	</script>
	<script type="module">
		//Плавно показать блоки классом waitshow при попадании в видимую область
		const waitshow = await import('/-imager/waitshow.js').then(r => r.default)
		waitshow.init()
	</script>
	
</html>
`
export const HEADER = (data, env) => `
	<div class="container">
		<style>
			${env.scope} .header_logo {
/*				margin: 0.5em 4em 0.5em 0;*/
				margin: 0.5em 0;
			}
			${env.scope} .header_content {	
				display: flex;
				flex-grow: 1;
				gap: 1em;
				justify-content: space-between;
				align-items: center;
			}
			${env.scope} .header_list a {
				line-height: 1.3;
				position: relative;
				padding: 1em 0;
			}
			${env.scope} .header_list a:after {
				display: block;
				position: absolute;
				top: 0;
				left: 0;
				width: 0;
				height: 3px;
				background-color:var(--blue);
				content: "";
				transition: width 0.3s ease-out;
			}
			${env.scope} .header_list a:hover:after,
			${env.scope} .header_list a:focus:after {
				width: 100%;
			}	
			${env.scope} .header_list {
				display: flex;
				gap: 2.5rem;
				align-items: center;
			}
			@media (max-width: 400px) {
				${env.scope} .header_list {
					display: none;
				}
			}	
			
		</style>
		<div style="display: flex; gap: 1rem; justify-content: space-between;">
			
			
			<div class="header_content">
				
				<div class="header_logo" style="text-align: left; align-self: center;">
					<a href="/" style="text-decoration: none; color:inherit; display: grid; grid-template-columns: auto 1fr; gap:0.5rem; align-items: center;">
						<span>
							<svg width="49" height="47" viewBox="0 0 49 47" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M39.6232 25.2946C38.4148 29.8048 37.8104 32.0598 36.4406 33.5224C35.359 34.6772 33.9592 35.4854 32.4184 35.8446C32.2258 35.8896 32.0304 35.9242 31.83 35.9488C29.9998 36.1746 27.7668 35.5762 23.7016 34.487C19.1914 33.2784 16.9363 32.6742 15.4737 31.3044C14.3189 30.2228 13.5107 28.823 13.1515 27.282C12.6964 25.3304 13.3007 23.0754 14.5092 18.5653L15.5444 14.7015C15.7182 14.0529 15.8795 13.4509 16.0324 12.8912C16.9426 9.55914 17.5542 7.72596 18.727 6.47374C19.8086 5.3189 21.2084 4.51074 22.7494 4.15146C24.7008 3.69642 26.956 4.30066 31.4662 5.50916C35.9762 6.71766 38.2314 7.3219 39.694 8.69174C40.8488 9.77336 41.657 11.1731 42.0162 12.7141C42.338 14.0942 42.13 15.6261 41.5532 18" stroke="#1C274C" stroke-width="3" stroke-linecap="round"/>
								<path d="M5.54444 33.294C6.75294 37.8042 7.35718 40.0592 8.72702 41.5218C9.80864 42.6766 11.2084 43.4848 12.7493 43.844C14.7009 44.299 16.956 43.6948 21.4662 42.4864C25.9762 41.2778 28.2314 40.6736 29.694 39.3038C30.6798 38.3804 31.413 37.2252 31.83 35.9482M16.0324 12.8906C15.3274 13.0729 14.5548 13.2799 13.7015 13.5086C9.19138 14.7171 6.9363 15.3213 5.47374 16.6911C4.3189 17.7728 3.51074 19.1725 3.15146 20.7134C2.82964 22.0936 3.03766 23.6258 3.61456 26" stroke="#1C274C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</span>
						<span style="font-size:1.6rem; line-height: 1.2; font-weight:700; letter-spacing: 0.52px; text-transform: uppercase;">notelic</span>
					</a>
				</div>
				<div class="header_list">
					<a href="/notes">Мои заметки</a>
					<!-- <a href="/#tosupport">Поддержать проект</a>
					<a href="/contacts">Контакты</a> -->
				</div>
			</div>
			${showBars(data, env)}
		</div>
	</div>
`
const showBars = (data, env) => `
	<div style="z-index:20; position: relative;">
		<style>
			${env.scope} .bars {
				cursor: pointer;
				transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);				
				margin-right: -20px;
			}
			${env.scope} .bars.show {
				transform: rotate(90deg);
			}
			${env.scope} .bars path {
				transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1),
				stroke-dasharray 500ms cubic-bezier(0.4, 0, 0.2, 1),
				stroke-dashoffset 500ms cubic-bezier(0.4, 0, 0.2, 1);
			}
			${env.scope} .bars path:nth-child(1) {
				transform-origin: 36% 40%;
			}
			${env.scope} .bars path:nth-child(2) {
				stroke-dasharray: 29 299;
			}
			${env.scope} .bars path:nth-child(3) {
				transform-origin: 35% 63%;
			}
			${env.scope} .bars path:nth-child(4) {
				stroke-dasharray: 29 299;
			}
			${env.scope} .bars path:nth-child(5) {
				transform-origin: 61% 52%;
			}
			${env.scope} .bars path:nth-child(6) {
				transform-origin: 62% 52%;
			}
			${env.scope} .bars.show path:nth-child(1) {
				transform: translateX(9px) translateY(1px) rotate(45deg);
			}
			${env.scope} .bars.show path:nth-child(2) {
				stroke-dasharray: 225 299;
				stroke-dashoffset: -72px;
			}
			${env.scope} .bars.show path:nth-child(3) {
				transform: translateX(9px) translateY(1px) rotate(-45deg);
			}
			${env.scope} .bars.show path:nth-child(4) {
				stroke-dasharray: 225 299;
				stroke-dashoffset: -72px;
			}
			${env.scope} .bars.show path:nth-child(5) {
				transform: translateX(9px) translateY(1px) rotate(-45deg);
			}
			${env.scope} .bars.show path:nth-child(6) {
				transform: translateX(9px) translateY(1px) rotate(45deg);
			}
			@media (max-width: 1024px) {
				${env.scope} .bars {
					margin-left: 1rem;
				}
			}
			@media (max-width: 550px) {
				${env.scope} .bars {
					margin: -0.3rem;
				}
			}			
			${env.scope} .menu {
				background-color: rgba(255, 255, 255, 0.70);
				backdrop-filter: blur(25px);
				background-size: cover;
				height: 100vh;
				width: 48vw;
				margin-left: auto;
				padding-top: 67px;
				padding-left: 2.7rem;
				padding-right: 19.2rem;
				overflow: auto;
			}
			${env.scope} .menublock {
				display: grid;
				margin-bottom: 2.3rem;
			}
			${env.scope} .menublock a {
				padding: 0.6rem 0.4rem;
				display: grid;
				color: var(--blue);
				border-bottom: 1px solid var(--blue);
				font-family: PT Mono, sans-serif;
				letter-spacing: 0.32px;
			}
			${env.scope} .cover {
				height: 100vh;
				min-width:100%;
				position:fixed;
				left: 0;
				top: 0;
				bottom: 0;
				z-index: 19;
				background-color: #d4d6e375;
				opacity: 0;
				visibility: hidden;
				transition: opacity, visibility;
				transition-duration: 0.5s; 
			}
			${env.scope} .cover.show {
				opacity: 1;
				visibility: visible;
			}
			${env.scope} .menu_greeting {
				margin: 2.5rem 0 2.3rem 0;
				padding-left: 0.4rem;
			}
			${env.scope} .greeting	{
				margin: 0 0 0.8rem 0;
			}
			${env.scope} .menu_greeting p {
				font-family: PT Mono, sans-serif;
				line-height: 1.5;
				letter-spacing: 0.32px;
			}
			${env.scope} .menu_form {
				position: relative;
			}
			
			${env.scope} .menu_greeting button {
				background-color: var(--blue);
				color: white;
				font-family: PT Mono, sans-serif;
			}
			${env.scope} .terms {
				font-size: 0.75rem;
				margin: 0.8rem 0 0 0;
			}
			${env.scope} .terms a {
				color: var(--blue);
			}
			@media (max-width: 1400px) {
				${env.scope} .menu {
					padding-right: 15.2rem;
				}
			}
			@media (max-width: 1275px) {
				${env.scope} .menu {
					width: 50vw;
					padding-right: 10rem;
				}
			}
			@media (max-width: 1050px) {
				${env.scope} .menu {
					width: 60vw;
				}
			}
			@media (max-width: 900px) {
				${env.scope} .menu {
					width: 65vw;
					padding-right: 5rem;
				}
			}
			@media (max-width: 767px) {
				${env.scope} .menu {
					width: 70vw;
					padding-right: var(--page);
				}
			}
			@media (max-width: 550px) {
				${env.scope} .menu {
					width: 80vw;
					padding-left: 1.7rem;
				}
				${env.scope} .menu_greeting {
					margin: 1rem 0 1.5rem 0;
				}
				${env.scope} .menublock {
					margin-bottom: 1.5rem;
				}
			}
			@media (max-width: 450px) {
				${env.scope} .menu {
					width: 90vw;
				}
			}
			
		</style>
		<svg class="bars" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 200 200">
			<g stroke-width="6.5" stroke-linecap="round">
				<path
					d="M72 82.286h28.75"
					fill="#009100"
					fill-rule="evenodd"
					stroke="#1C274C"
				/>
				<path
					d="M100.75 103.714l72.482-.143c.043 39.398-32.284 71.434-72.16 71.434-39.878 0-72.204-32.036-72.204-71.554"
					fill="none"
					stroke="#1C274C"
				/>
				<path
					d="M72 125.143h28.75"
					fill="#009100"
					fill-rule="evenodd"
					stroke="#1C274C"
				/>
				<path
					d="M100.75 103.714l-71.908-.143c.026-39.638 32.352-71.674 72.23-71.674 39.876 0 72.203 32.036 72.203 71.554"
					fill="none"
					stroke="#1C274C"
				/>
				<path
					d="M100.75 82.286h28.75"
					fill="#009100"
					fill-rule="evenodd"
					stroke="#1C274C"
				/>
				<path
					d="M100.75 125.143h28.75"
					fill="#009100"
					fill-rule="evenodd"
					stroke="#1C274C"
				/>
			</g>
		</svg>		
	</div>
	<div class="cover">
		<div class="menu">
			<div id="MENU_USER"></div>
			<div class="menublock">
				<a href="/user">Личный кабинет</a>
				<a href="/notes">Мои заметки</a>
				<a href="/#tosupport">Поддержать проект</a>
				<!-- <a href="/#order">Заказать проект</a> -->
				<a style="border-bottom: none" href="/contacts">Контакты</a>
			</div>
			<div style="padding-bottom:4rem; margin-top: -1rem; padding-top:1rem; overflow: hidden;">
				${magicBtn.def(data, env)}
			</div>
		</div>
	</div>
	<script type="module">
		const bars = document.body.querySelector(".bars")
		const menu = document.body.querySelector(".cover")
		const toggle = () => {
			showed = !showed
			bars.classList.toggle("show")
			menu.classList.toggle("show")
		}
		let showed = false
		bars.addEventListener("click" , () => {
			toggle()
		})
		document.addEventListener("keyup" , e => {
			if (!showed) return
			if (e.keyCode != 27) return
			toggle()
		})
		document.body.addEventListener('click', e => {
			if (!menu.classList.contains('show')) return
			if (!e.target.closest('a') && !e.target.closest('button')) {
				if (e.target.closest('.menu')) return
			}
			if (e.target.closest('.bars')) return
			toggle()
		})
	</script>
`
export const FOOTER = (data, env) => `
	<div style="padding: 0.5rem 0; background-color: hsla(265, 17%, 21%, 90%);">
		<div id="FOOTERTOP"></div>
	</div>
	<style>
		{env.scope} .container.footer {
			display: grid;
			grid-template-columns: auto auto;
			grid-template-areas: "logo menu" "berloga berloga" "terms terms";
			gap: 1rem;
		}
		{env.scope} .botmenu {
			justify-self: end;
			display: flex;
			gap: 1rem;
		}
		${env.scope} span {
			color: var(--lightgrey);			
		}
		${env.scope} a {
			color: #cbd3ff;
		}		
		${env.scope} .midrow {
			display: flex;
			justify-content: space-between;			
		}
		${env.scope} .botrow {
			display: flex;
			justify-content: space-between;
			color: var(--lightgrey);
			font-size: 0.9rem;			
		}
		${env.scope} .botrow a {
			color: var(--lightgrey);
			font-size: 0.9rem;
		}
		${env.scope} a:hover {
			color: var(--blue);
		}
		@media (max-width: 750px) {
			${env.scope} .botrow {
				flex-direction: column-reverse;
				gap: 0.3rem;
				justify-content: normal;
			}
			${env.scope} .midrow {
				flex-direction: column;
				gap: 0.3rem;
				justify-content: normal;
			}
			{env.scope} .container.footer {
				grid-template-areas:
					"logo menu"
					"terms berloga";
			}
		}
		@media (max-width: 450px) {
			{env.scope} .container.footer {
				grid-template-areas:
					"logo" "menu"
					"terms" "berloga";
			}
			{env.scope} .botmenu {
				justify-self: start;
			}
			${env.scope} .midrow {
				justify-self: start;
			}
		}
	</style>
	<div style="background-color: #2F2E41;
			padding-top: 2.3rem;
			padding-bottom: 1.5rem">
		<div class="container footer">	
			<div class="header_logo" style="text-align: left; grid-area: logo;">
				<a href="/" style="text-decoration: none; color:inherit; display: grid; grid-template-columns: auto 1fr; gap:0.5rem;">
					<span>
						<svg width="49" height="47" viewBox="0 0 49 47" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M39.6232 25.2946C38.4148 29.8048 37.8104 32.0598 36.4406 33.5224C35.359 34.6772 33.9592 35.4854 32.4184 35.8446C32.2258 35.8896 32.0304 35.9242 31.83 35.9488C29.9998 36.1746 27.7668 35.5762 23.7016 34.487C19.1914 33.2784 16.9363 32.6742 15.4737 31.3044C14.3189 30.2228 13.5107 28.823 13.1515 27.282C12.6964 25.3304 13.3007 23.0754 14.5092 18.5653L15.5444 14.7015C15.7182 14.0529 15.8795 13.4509 16.0324 12.8912C16.9426 9.55914 17.5542 7.72596 18.727 6.47374C19.8086 5.3189 21.2084 4.51074 22.7494 4.15146C24.7008 3.69642 26.956 4.30066 31.4662 5.50916C35.9762 6.71766 38.2314 7.3219 39.694 8.69174C40.8488 9.77336 41.657 11.1731 42.0162 12.7141C42.338 14.0942 42.13 15.6261 41.5532 18" stroke="#F6F6FA" stroke-width="3" stroke-linecap="round"/>
							<path d="M5.54444 33.294C6.75294 37.8042 7.35718 40.0592 8.72702 41.5218C9.80864 42.6766 11.2084 43.4848 12.7493 43.844C14.7009 44.299 16.956 43.6948 21.4662 42.4864C25.9762 41.2778 28.2314 40.6736 29.694 39.3038C30.6798 38.3804 31.413 37.2252 31.83 35.9482M16.0324 12.8906C15.3274 13.0729 14.5548 13.2799 13.7015 13.5086C9.19138 14.7171 6.9363 15.3213 5.47374 16.6911C4.3189 17.7728 3.51074 19.1725 3.15146 20.7134C2.82964 22.0936 3.03766 23.6258 3.61456 26" stroke="#F6F6FA" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</span>
					<span>
						<span style="font-size:1.6rem; line-height: 1.2; font-weight:700; letter-spacing: 0.52px; text-transform: uppercase;">notelic</span>
						<span style="display: grid; font-size:1rem;  font-family: monospace;">
							<span class="step" style="transition: opacity 0.2s; opacity: 1; grid-row: 1 / 1; grid-column: 1 / 1;">write together</span>
							<span class="step" style="transition: opacity 0.2s; opacity: 0; grid-row: 1 / 1; grid-column: 1 / 1;">share by link</span>
						</span>
					</span>
				</a>
				<script>
					(async a => {
						a.addEventListener('click', async e => {
							if (location.pathname != '/') return
							const { Dialog } = await import('/-dialog/Dialog.js')
							Dialog.open({
								div: a.parentElement, 
								tpl:'/home.html.js', 
								sub:'POPUP'
							})
							
						})
					})(document.currentScript.previousElementSibling)
				</script>
			</div>
			<div class="botmenu" style="grid-area: menu;">
				<a href="/contacts">Контакты</a>
				<a href="/about">О сервисе</a>
			</div>			
			
			<div class="midrow" style="grid-area: berloga;">
				<div style="margin:0; text-align:right;">${~env.host.indexOf('127.0.0.1') ? '': metrikapicture()}</div>
				${berloga()}
			</div>
			<div class="botrow" style="grid-area: terms;">
				${new Date().getFullYear()} &copy; Все права защищены
				<a href="/terms">Политика конфиденциальности</a>
			</div>
		</div>
		<script>
			(btn => {
				const steps = btn.getElementsByClassName('step')
				const one = steps[0]
				const two = steps[1]
				const ar = [two, one]
				const change = () => {
					ar.reverse()
					ar[0].style.opacity = 0
					ar[1].style.opacity = 1
				}
				btn.addEventListener('mouseenter', change)
				btn.addEventListener('mouseleave', change)
			})(document.currentScript.parentElement)
		</script>
	</div>
`


export const USER = (data, env) => `
	${data.user.email ? showGreeting(data, env) : showForm(data, env)}
`
export const MENU = (data, env) => `
	
`
const showGreeting = (data, env) => `
	<div class="menu_greeting">
		<p class="greeting">
			${data.user.date_signup > (new Date().getTime())/1000 - 24 * 60 * 60 ? showFreshGreeting(data, env) : showOldGreeting(data, env)}
			<span class="a" style="float:right">Выход</span>
			<script>
				(button => {
					let start = false
					button.addEventListener('click', async () => {
						if (start) return
						if (!confirm('Вы уверены, что хотите выйти из аккаунта?')) return
						start = true
						const senditmsg = await import('/-dialog/senditmsg.js').then(r => r.default)
						const ans = await senditmsg(button, '/-user/set-logout')
						if (!ans.result) {
							start = false
							return
						}
						const Client = await window.getClient()
						Client.reloaddiv('${env.layer.div}')
						Client.go('/')
						start = false
					})
				})(document.currentScript.previousElementSibling)
			</script>
		</p>
	</div>
`
const showOldGreeting = (data, env) => `
	Привет, <span style="color: var(--red);">${data.user.email}</span>!
`
const showFreshGreeting = (data, env) => `
	Привет, <span style="color: var(--red);">${data.user.email}</span>! 
	<br>Теперь твои заметки будут доступны на всех устройствах.
`
const showForm = (data, env) => `
	<div class="menu_greeting">
		<style>
			${env.scope} .menu_greeting button {

				border-top-right-radius: 20px;
				border-bottom-right-radius: 20px;
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
				
				padding: 0.4rem 1.2rem;
			}
			${env.scope} .menu_greeting .float-label input {
				border: 1px solid var(--blue);
				border-radius: 0;
				border-top-left-radius: 20px;
				border-bottom-left-radius: 20px;
			}
		</style>
		<p class="greeting">
			Привет, друг! Зарегистрируйся, чтобы синхронизировать заметки на всех устройствах.
		</p>
		<div style="max-width:349px; display: grid; grid-template-columns: 1fr max-content">
			<div class="float-label">
				<input id="${env.sid}email" name="email" type="email" placeholder="Email">
				<label for="${env.sid}email">Email</label>
			</div>
			<button type="submit">Войти</button>
			<script>
				(div => {
					const button = div.querySelector('button')
					const input = div.querySelector('input')
					let start = false
					const submit = async () => {
						if (start) {
							console.log('Чё тыкаешь?')
							return
						}
						start = true

						const senditmsg = await import('/-dialog/senditmsg.js').then(r => r.default)
						const recaptcha = await import('/-dialog/recaptcha.js').then(r => r.default)
						const args = {}
						args['g-recaptcha-response'] = await recaptcha.getToken()
						args['email'] = input.value
						const ans = await senditmsg(button, '/-set-signup-email', args)
						if (!ans.result) {
							start = false
							return
						}

						const Client = await window.getClient()
						await Client.reloaddiv('${env.layer.div}')

						start = false
					}

					button.addEventListener('click', submit)
					input.addEventListener('keypress', e => {
						if (e.keyCode == 13) submit()
					})
				})(document.currentScript.parentElement)
			</script>
		</div>

		<p style="color: #667085" class="terms">
			Регистрируясь в сервисе notelic.ru, вы соглашаетесь с <a href="/terms">Политикой конфиденциальности</a>
		</p>
	</div>
`

const metrikapicture = () => `

	<a href="https://metrika.yandex.ru/stat/?id=94957675&amp;from=informer"
	target="_blank" rel="nofollow"><img load="lazy" src="https://informer.yandex.ru/informer/94957675/3_1_FFFFFFFF_EFEFEFFF_0_pageviews"
	style="width:88px; height:31px; border:0;" alt="Яндекс.Метрика" title="Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)" class="ym-advanced-informer" data-cid="94957675" data-lang="ru" /></a>

`
const berloga = () => `
	<div id="berloga">
		<style>
			#berloga {
				position: relative;
				z-index: 1;				
				padding: 0.4em 0.6em 0.5em;				
				width:fit-content;
				margin-left: auto;
				display: grid; grid-gap: 0.5em; 
				line-height: 1.3;
				text-align: right;
				grid-template-columns: 1fr 2.4em;
				color: var(--lightgrey);				
			}
			#berloga path {
				transition: d 1s ease-out;
			}
			#berloga:hover path {
				transition: d 0.3s ease-out;
			}

			#berloga:hover svg .green {
				d: path('M 40 30 L 100 100 L 100 30');
			}
			#berloga:hover svg .brown {
				d: path('M 100 30 L 100 100 L 40 100');
			}
			#berloga:hover svg .yellow {
				d: path('M 40 30 L 100 100 L 40 100');
			}
			#berloga:hover svg .blue {
				d: path('M 0 0 L 100 0 L 100 20 L 0 20');
			}
			#berloga:hover svg .red {
				d: path('M 0 30 L 30 30 L 30 100 L 0 100');
			}			
			@media(max-width: 450px) {
				#berloga {					
					text-align: left;
					padding: 0.4em 0.6em 0.5em 0;
				}
			}
		</style>
		<!-- <div>
			Сервис&nbsp;разработан<br>в&nbsp;<a style="font-size:100%;" title="Разработка быстрых сайтов" href="https://geparda.net">Берлоге Гепарда</a>
		</div> -->
		<!-- <div>
			Сервис&nbsp;разработан<br><a style="font-size:100%;" title="Разработка быстрых сайтов" href="https://geparda.net">Гепардом в берлоге</a>
		</div> -->
		<div>
			Разработка<br><a style="font-size:100%; color: var(--lightgrey);" title="Разработка быстрых сайтов" href="https://geparda.net">Гепарда</a>
		</div>
		<!-- <div>
			Сделано в<br><a style="font-size:100%;" title="Разработка быстрых сайтов" href="https://geparda.net">Гепарде</a>
		</div> -->
		<a title="Создание сайтов" style="border: none; padding:0" href="https://geparda.net">
			<svg style="padding-top: 0.2em; display:block; width:100%; height: auto;" width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
				<path class="green" d="M 33 24 L 100 100 L 100 30" fill="#8FBD9C"></path>
				<path class="brown" d="M 100 30 L 100 100 L 40 100" fill="#79606D"></path>
				<path class="yellow" d="M 33 24 L 100 100 L 40 100" fill="#ECC9AC"></path>
				<path class="blue" d="M 0 0 L 100 0 L 100 21 L 0 12" fill="#A2CECE"></path>
				<path class="red" d="M 0 21 L 24 23 L 31 100 L 0 100" fill="#D47474"></path>
			</svg>
		</a>
	</div>	
`
