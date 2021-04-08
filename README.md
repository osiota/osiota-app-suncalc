<!--
Auto generated documentation:
  * Adapt schema.json and
  * Run npm run doc

Please edit schema.json or
	https://github.com/simonwalz/osiota-dev/blob/master/partials/main.md
-->
<a name="root"></a>
# osiota application sun position

*Osiota* is a software platform capable of running *distributed IoT applications* written in JavaScript to enable any kind of IoT tasks. See [osiota](https://github.com/osiota/osiota).

## Configuration: suncalc


The application triggers at sun-related time points. This allows to implement switching functions e.g. at sunrise or sunset.

**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**latitude**|`number`|Choose a location<br/>|no|
|**longitude**|`number`||no|
|**height**|`number`|Above see level<br/>|no|
|**timepoint**|`string`|The following sun-related times can be selected<br/>Default: `"sunrise"`<br/>Enum: `"sunrise"`, `"sunriseEnd"`, `"goldenHourEnd"`, `"solarNoon"`, `"goldenHour"`, `"sunsetStart"`, `"sunset"`, `"dusk"`, `"nauticalDusk"`, `"night"`, `"nadir"`, `"nightEnd"`, `"nauticalDawn"`, `"dawn"`, `"customMorning"`, `"customEvening"`<br/>|no|
|**custom\_angle**<br/>(angle)|`number`|Define an angel for custom time points:<br/><br/>**Dawn**: `-6`<br/>**Sunrise**: `-0.833`<br/>**Morning golden hour**: `6`.<br/>Minimum: `-90`<br/>Maximum: `90`<br/>|no|

**Additional Properties:** not allowed<br/>
**Example**

```json
{
    "latitude": 52.51872463625155,
    "longitude": 13.376219384358473,
    "height": 0,
    "timepoint": "sunrise"
}
```


## How to setup

Add a configuration object for this application, see [osiota configuration](https://github.com/osiota/osiota/blob/master/doc/configuration.md):

```json
{
    "name": "suncalc",
    "config": CONFIG
}
```

## License

Osiota and this application are released under the MIT license.

Please note that this project is released with a [Contributor Code of Conduct](https://github.com/osiota/osiota/blob/master/CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.
