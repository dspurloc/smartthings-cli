import { LocationItem } from '@smartthings/core-sdk'

import { SelectingAPICommand } from '@smartthings/cli-lib'


export default class LocationsDeleteCommand extends SelectingAPICommand<LocationItem> {
	static description = 'delete a location'

	static flags = SelectingAPICommand.flags

	static args = [{
		name: 'id',
		description: 'location id',
	}]

	primaryKeyName = 'locationId'
	sortKeyName = 'name'

	async run(): Promise<void> {
		const { args, argv, flags } = this.parse(LocationsDeleteCommand)
		await super.setup(args, argv, flags)

		await this.processNormally(args.id,
			async () => await this.client.locations.list(),
			async (id) => { await this.client.locations.delete(id) },
			'location {{id}} deleted')
	}
}
