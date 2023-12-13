<script>
	import { supabase } from '$lib/supabaseClient.mjs';
    import { goto } from '$app/navigation';
    import { tokenStore } from '../../../lib/stores/tokenStore.mjs';
    import { onMount } from 'svelte';

	let manufacturerName = '';
	let additionalInfo = '';
	let vendorName = '';
	let address = '';
	let contactInfo = '';
	let buildingName = '';
	let roomNumber = '';
	let poDate = '';
	let vendorId = '';
	let unitCost = '';
	let serialNumber = '';
	let locationId = '';
	let poId = '';
	let manufacturerId = '';
	let model = '';
	let itemDescription = '';
	let relocationStatus = '';
	let data = [];

	async function fetchAllAssetsWithDetails() {
		const { data: assetData, error } = await supabase.from('asset').select(`
                *,
                location!inner(*),
                manufacturer!inner(*),
                purchaseorder!inner(*, vendor!inner(*))
            `);

		if (error) {
			console.error('Error fetching assets:', error);
			return;
		}

		// Assign the fetched assets to the data variable
		displayData(assetData);
	}

	// Call the function when the component is mounted
	onMount(fetchAllAssetsWithDetails);

	async function applyFilters(tableName, filters) {
		let query = supabase.from(tableName).select('*');

		// Dynamically apply filters
		for (const [key, value] of Object.entries(filters)) {
			if (value) {
				query = query.ilike(key, `%${value}%`);
			}
		}

		const { data, error } = await query;

		if (error) {
			console.error('Error:', error);
		} else {
			console.log('Filtered Data:', data);
			displayData(data);
		}
	}

	function displayData(fetchedData) {
		data = fetchedData;
	}

	onMount(() => {
        const token = localStorage.getItem('sb-flxtlnvnokmvuesdmzbg-auth-token');
        tokenStore.set(token)

		if (!token) {
            goto('/login')
            return
        }
    })
</script>

<div>
	<input type="text" bind:value={manufacturerName} placeholder="Manufacturer Name" />
	<textarea bind:value={additionalInfo} placeholder="Additional Info"></textarea>
	<button
		on:click={() =>
			applyFilters('manufacturer', {
				manufacturer_name: manufacturerName,
				additional_info: additionalInfo
			})}>Submit</button
	>
</div>

<div>
	<input type="text" bind:value={buildingName} placeholder="Building Name" />
	<input type="number" bind:value={roomNumber} placeholder="Room Number" />
	<button
		on:click={() =>
			applyFilters('location', { building_name: buildingName, room_number: roomNumber })}
		>Apply Filters</button
	>
</div>

<div>
	<input type="text" bind:value={vendorName} placeholder="Vendor Name" />
	<textarea bind:value={address} placeholder="Address"></textarea>
	<input type="text" bind:value={contactInfo} placeholder="Contact Info" />
	<button
		on:click={() => applyFilters('vendors', { vendor_name: vendorName, contact_info: contactInfo })}
		>Submit</button
	>
</div>

<div>
	<input type="date" bind:value={poDate} placeholder="PO Date" />
	<input type="text" bind:value={vendorId} placeholder="Vendor ID" />
	<input type="number" bind:value={unitCost} placeholder="Unit Cost" />
	<button
		on:click={() =>
			applyFilters('purchaseorder', { po_date: poDate, vendor_id: vendorId, unit_cost: unitCost })}
		>Submit</button
	>
</div>

<div>
	<input type="text" bind:value={serialNumber} placeholder="Serial Number" />
	<input type="text" bind:value={locationId} placeholder="Location ID" />
	<input type="text" bind:value={poId} placeholder="PO ID" />
	<input type="text" bind:value={manufacturerId} placeholder="Manufacturer ID" />
	<input type="text" bind:value={model} placeholder="Model" />
	<input type="text" bind:value={itemDescription} placeholder="Item Description" />
	<input type="text" bind:value={relocationStatus} placeholder="Relocation Status" />
	<button
		on:click={() =>
			applyFilters('asset', {
				serial_number: serialNumber,
				location_id: locationId,
				po_id: poId,
				manufacturer_id: manufacturerId,
				model: model,
				item_description: itemDescription,
				relocation_status: relocationStatus
			})}>Submit</button
	>
</div>

<div class="view-assets-wrapper">
	<h2>All Asset Details</h2>
	<div class="table-wrapper">
		<table class="data-table">
			<thead>
				<tr>
					<th>Asset ID</th>
					<th>Serial Number</th>
					<th>Model</th>
					<th>Item Description</th>
					<th>Relocation Status</th>
					<th>Manufacturer ID</th>
					<th>Manufacturer Name</th>
					<th>Location ID</th>
					<th>Building Name</th>
					<th>Room Number</th>
					<th>Purchase Order ID</th>
					<th>Vendor Name</th>
					<th>Vendor Address</th>
					<th>Contact Info</th>
				</tr>
			</thead>
			<tbody>
				{#each data as asset (asset.asset_id)}
					<tr>
						<td>{asset.asset_id}</td>
						<td>{asset.serial_number}</td>
						<td>{asset.model}</td>
						<td>{asset.item_description}</td>
						<td>{asset.relocation_status}</td>
						<td>{asset.manufacturer.manufacturer_id}</td>
						<td>{asset.manufacturer.manufacturer_name}</td>
						<td>{asset.location.location_id}</td>
						<td>{asset.location.building_name}</td>
						<td>{asset.location.room_number}</td>
						<td>{asset.purchaseorder.po_id}</td>
						<td>{asset.purchaseorder.vendor.vendor_name}</td>
						<td>{asset.purchaseorder.vendor.address}</td>
						<td>{asset.purchaseorder.vendor.contact_info}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<div>
	{#each data as item}
		<div>
			<p>Manufacturer Name: {item.manufacturer_name}</p>
			<p>Additional Info: {item.additional_info}</p>
			<!-- Add more fields as needed -->
		</div>
	{/each}
</div>

<style>
    .view-assets-wrapper {
        max-width: 90vw;
        margin: 0 auto;
        padding: 20px;
        font-family: Arial, sans-serif;
        background-color: #0056b3; /* Blue background */
        color: white; /* White text */
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }

    .table-wrapper {
        overflow-x: auto;
    }

    .data-table {
        width: 80%;
        border-collapse: collapse;
        color: white; /* White text */
    }

    .data-table th,
    .data-table td {
        border: 1px solid white; /* White border */
        padding: 8px;
        text-align: left;
    }

    .data-table th {
        background-color: #0056b3; /* Blue background for headers */
        color: white; /* White text */
    }

    /* Rest of the styles for input, textarea, and button remain the same */
    input[type='text'],
    input[type='number'],
    input[type='date'],
    textarea {
        width: 90vw;
        padding: 8px;
        margin: 8px 0;
        border: 1px solid #444;
        border-radius: 4px;
        box-sizing: border-box;
        color: #e0e0e0; /* Light gray text */

    }

    button {
        width: 90vw;
        background-color: #0056b3; /* Blue background */
        color: white; /* White text */
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        
    }

    button:hover {
        background-color: #003f6b; /* Darker blue on hover */
    }
</style>

