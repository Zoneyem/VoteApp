const app = Vue.createApp({
	data() {
		return {
			submissions: submissions, // aus seed.js
		};
	},
	computed: {
		TotalVotes() {
			return this.submissions.reduce((TotalVotes, submission) => {
				return TotalVotes + submission.votes;
			}, 0);
		},

		sortedSubmissions() {
			return this.submissions.sort((a, b) => {
				return b.votes - a.votes;
			});
		},

		cardHeaderBackground() {
			return {
				"bg-primary": this.TotalVotes >= 50,
				"text-white": this.TotalVotes >= 50,
			};
		},
		secondCard() {
			if (this.TotalVotes > 70) {
				return ["bg-secondary", "text-white"];
			}
		},
	},
	methods: {
	
	},
});


app.component("SubmissionListItem", {
	props: ["submission"],
	methods: {
		upvote() {
			
			this.submission.votes++;
		},
	},
	template: `
	<div class="d-flex">
		<div class="d-shrink-0">
			<img v-bind:src="submission.img" alt="" />
		</div>
		<div class="flex-grow-1 ms-3">
			<h5>
				{{submission.title}}
				<span
					class="float-end text-primary"
					style="cursor: pointer"
					v-on:click="upvote()"
					><i class="fa fa-chevron-up"></i>
					<strong>{{submission.votes}}</strong>
				</span>
			</h5>
			<div>{{submission.desc}}</div>
			<small class="text-muted"
				>Eingereicht von: {{submission.author}}</small
			>
		</div>
	</div>

     `,
});

const vm = app.mount("#app");
