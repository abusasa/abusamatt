const magicBtn = {} 
export default magicBtn

magicBtn.plus = (data, env) => `
	<button href="#" class="new_note" style="justify-self: center;">
		<style>
			${env.scope} .new_note {
				cursor: pointer;
				opacity: 0.8;
				background-color: white;
				display: flex;
				align-items: center;
				border: solid 2px #58354c;
				font-size: 0.8rem;
			}
			${env.scope} .cross {
				transition: opacity 0.2s,  transform 0.2s, margin-right 0.2s;
				border-radius: 50%;
				transform-origin: center;
				width: 30px;
				height: 30px;
			}
			${env.scope} .new_note .line {
				transition: 0.2s;
				height: 2px;
				background-color: var(--link-color);
				border-radius: 2px;
				transform-origin: center;
				width: 15px;
				display: block;
				margin: 3px auto;
			}
			${env.scope} .new_note .middle {
				transform: translateY(6px) rotate(-90deg);
			}
			${env.scope} .new_note .top {
			 transform: translateY(11px);
			}
			${env.scope} .new_note:hover .line {
				background-color: brown;
			}
			@media (max-width: 450px) {
				${env.scope} .cross_span {
					display:  none;
				}
			}
		</style>
		<div class="cross">
			<div class="line top"></div>
			<div class="line middle"></div>
		</div>
		<span class="cross_span" style="color: #58354c">Новая заметка</span>
	</button>
	<script>
		(btn => {
			btn.addEventListener('click', async () => {
				const sendit = await import('/-dialog/sendit.js').then(r => r.default)
				const ans = await sendit(btn, '/-set-create')
				if (ans.msg) {
					const Dialog = await import('/-dialog/Dialog.js').then(r => r.default)
					Dialog.alert(ans.msg)
				}
				if (ans.result) {
					const Client = await window.getClient()
					Client.reloaddiv('NOTES')
					Client.go('/note/'+ans.note.note_id + '-' + ans.note.token)
				}
			})
		})(document.currentScript.previousElementSibling)
	</script>
`
magicBtn.def = (data, env) => `
	<button class="button_magic">
		<div class="button__line"></div>
		<div class="button__line"></div>
		<span class="button__text">Новая заметка</span>
		<div class="button__drow1"></div>
		<div class="button__drow2"></div>
	</button>
	<script>
		(btn => {
			btn.addEventListener('click', async () => {
				const senditmsg = await import('/-dialog/senditmsg.js').then(r => r.default)
				const ans = await senditmsg(btn, '/-set-create')
				if (!ans.result) return
				const Client = await window.getClient()
				Client.reloaddiv('NOTES')
				await Client.go('/note/' + ans.note.note_id + '-' + ans.note.token)
				document.body.querySelector('textarea').focus()
			})
		})(document.currentScript.previousElementSibling)
	</script>
`


magicBtn.boosty = (data, env, title = "Поддержать проект") => `
	<a target="about:blank" href="https://boosty.to/notelic/donate" class="button_magic">
		<div class="button__line"></div>
		<div class="button__line"></div>
		<span class="button__text">${title}</span>
		<div class="button__drow1"></div>
		<div class="button__drow2"></div>
	</a>
`
