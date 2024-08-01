export const POPUP = (data, env) => `
	<div style="max-width: 585px">
		<!-- <style>
			${env.scope} a.img {
				float:right; margin: 0 0 5px 10px;
				max-width: 30%;
				min-width: 125px;
				border-left: 1px solid black;
				padding-left: 10px;
				padding-bottom: 30px;
			}
			${env.scope} a.img img {
				max-width: 100%;
				height: auto;
			}
			@media (max-width: 500px) {
				${env.scope} a.img {
					float: none;
					min-width: auto;
					border: none;
					padding: 0;
					display: block;
				    margin: 1rem 0;
				    max-width: 150px;
				}
			}
		</style> -->
		<h1 style="margin-bottom:1rem">Notelic.ru</h1>
		<p>
			 Сервис быстрых совместных заметок.
		</p>
		<p align="right" style="margin-top:2em">
			<button class="close">Прекрасно</button>
			<script>
				(btn => {
					btn.addEventListener('click', async () => {
						const Dialog = await import('/-dialog/Dialog.js').then(r => r.default)
						Dialog.hide()
					})
				})(document.currentScript.previousElementSibling)
			</script>
		</p>
	</div>
`