<script lang="ts">
	let chartElement: HTMLElement;
	let chart: any;

	let { data } = $props();

	$effect(() => {
		if (typeof window !== 'undefined') {
			(async () => {
				const ApexCharts = (await import('apexcharts')).default;

				const stockData = data.stockData.map((item) => {
					const totalStock = isNaN(item.totalStock) ? 0 : item.totalStock;
					return {
						agence: item.agence,
						totalStock
					};
				});

				const options = {
					chart: {
						type: 'radar',
						height: '100%'
					},
					series: [
						{
							name: 'Products',
							data: stockData.map((item) => item.totalStock)
						}
					],
					xaxis: {
						categories: stockData.map((item) => item.agence)
					},
					title: {
						text: 'Total Stock by Agency',
						align: 'center'
					}
				};

				chart = new ApexCharts(chartElement, options);
				chart.render();
			})();
		}

		return () => {
			if (chart) {
				chart.destroy();
				chart = undefined;
			}
		};
	});
</script>

<div bind:this={chartElement} class="chartcss h-[80vh] w-[100%] text-black"></div>
