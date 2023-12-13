<script>
	import { supabase } from '../../../lib/supabaseClient.mjs';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { tokenStore } from '../../../lib/stores/tokenStore.mjs';

	onMount(() => {
		const token = localStorage.getItem('sb-flxtlnvnokmvuesdmzbg-auth-token');
		tokenStore.set(token);
		if (!token) {
			goto('/login');
			return;
		}
	});

	let serialNumber = '';
	let building = '';
	let room = '';
	let relocationStatus = '';
	let vendorName = '';
	let vendorAddress = '';
	let vendorContactInfo = '';
	let unitCost = 0;
	let poDate = '';
	let manufacturer = '';
	let model = '';
	let vendorIdForPO = '';
	let additionalInfo = '';
	let itemDescription = '';
	let locationIdForAsset = '';
	let poIdForAsset = '';
	let manufacturerIdForAsset = '';

	async function insertLocation(building, room) {
		const { data, error } = await supabase
			.from('location')
			.insert({ building_name: building, room_number: room });
		return { data, error };
	}

	async function insertVendor(vendorName, vendorAddress, vendorContactInfo) {
		const { data, error } = await supabase
			.from('vendor')
			.insert({ vendor_name: vendorName, address: vendorAddress, contact_info: vendorContactInfo });
		return { data, error };
	}

	async function insertPurchaseOrder(poDate, unitCost, vendorId) {
		const { data, error } = await supabase
			.from('purchaseorder')
			.insert({ po_date: poDate, unit_cost: unitCost, vendor_id: vendorId });
		return { data, error };
	}

	async function insertManufacturer(manufacturerName, additionalInfo) {
		const { data, error } = await supabase
			.from('manufacturer')
			.insert({ manufacturer_name: manufacturerName, additional_info: additionalInfo });
		return { data, error };
	}

	async function insertAsset(
		serialNumber,
		model,
		description,
		relocationOption,
		locationId,
		poId,
		manufacturerId
	) {
		const { data, error } = await supabase.from('asset').insert({
			serial_number: serialNumber,
			model,
			item_description: description,
			relocation_status: relocationOption,
			location_id: locationId,
			po_id: poId,
			manufacturer_id: manufacturerId
		});
		return { data, error };
	}
</script>

<main>
	<h1 class="title">Add Asset</h1>

	<div>
		<input type="text" bind:value={building} placeholder="Building" />
		<input type="text" bind:value={room} placeholder="Room" />
		<button on:click={insertLocation(building, room)}>Submit Location</button>
	</div>

	<div>
		<input type="text" bind:value={vendorName} placeholder="Vendor Name" />
		<input type="text" bind:value={vendorAddress} placeholder="Vendor Address" />
		<input type="text" bind:value={vendorContactInfo} placeholder="Vendor Contact Info" />
		<button on:click={insertVendor(vendorName, vendorAddress, vendorContactInfo)}
			>Submit Vendor</button
		>
	</div>

	<div>
		<input type="date" bind:value={poDate} placeholder="PO Date" />
		<input type="number" bind:value={unitCost} placeholder="Unit Cost" />
		<input type="number" bind:value={vendorIdForPO} placeholder="Vendor ID" />
		<button on:click={insertPurchaseOrder(poDate, unitCost, vendorIdForPO)}
			>Submit Purchase Order</button
		>
	</div>

	<div>
		<input type="text" bind:value={manufacturer} placeholder="Manufacturer Name" />
		<textarea bind:value={additionalInfo} placeholder="Additional Info"></textarea>
		<button on:click={insertManufacturer(manufacturer, additionalInfo)}>Submit Manufacturer</button>
	</div>

	<div>
		<input type="text" bind:value={serialNumber} placeholder="Serial Number" />
		<input type="text" bind:value={model} placeholder="Model" />
		<input type="text" bind:value={itemDescription} placeholder="Item Description" />
		<input type="text" bind:value={relocationStatus} placeholder="Relocation Status" />
		<input type="number" bind:value={locationIdForAsset} placeholder="Location ID" />
		<!-- Assuming Location ID is needed -->
		<input type="number" bind:value={poIdForAsset} placeholder="PO ID" />
		<!-- Assuming PO ID is needed -->
		<input type="number" bind:value={manufacturerIdForAsset} placeholder="Manufacturer ID" />
		<!-- Assuming Manufacturer ID is needed -->
		<button
			on:click={insertAsset(
				serialNumber,
				model,
				itemDescription,
				relocationStatus,
				locationIdForAsset,
				poIdForAsset,
				manufacturerIdForAsset
			)}>Submit Asset</button
		>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
	}

	div {
		margin: 10px auto;
		padding: 20px;
		max-width: 550px;
		background-color: white; /* Blue background */
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	input[type='text'],
	input[type='number'] {
		width: 35vw;
		padding: 8px;
		margin: 8px 0;
		border: 1px solid grey; /* grey border */
		border-radius: 4px;
		background-color: transparent; /* Transparent background */
		color: black; /* black text */
		box-sizing: border-box;
	}

	button {
		width: 35vw;
		padding: 12px 20px;
		margin-top: 8px;
		background-color: #0056b3; /* White background */
		color: black; /* Blue text */
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background-color: #0056b3; /* Light gray on hover */
	}

	title {
		color: black;
	}
</style>
