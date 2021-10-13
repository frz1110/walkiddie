import { Map, InputMap } from './Map';
import { render } from '@testing-library/react';

jest.mock("@here/maps-api-for-javascript", () => {
    return {
        service: {
            Platform: function(x) {
                return {
                    createDefaultLayers: function () {
                        return {vector: {normal: {map: 0}}}
                    }
                }
            }
        },
        map: {
            Marker: function() {
                return {}
            }
        },
        mapevents: {
            Behavior: function() {},
            MapEvents: function() {}
        },
        Map: function() {
            return {
                setCenter: jest.fn(),
                addObject: jest.fn(),
                addEventListener: jest.fn(),
                removeObject: jest.fn(),
                removeEventListener: jest.fn(),
                dispose: jest.fn(),
            }
        }
    }
})

describe('<Map />', () => {
    it('should render', () => {
        render(<Map latitude={0} longitude={0} />)
    });
});

describe('<InputMap />', () => {
    it('should render', () => {
        render(<InputMap latitude={0} longitude={0} />)
    });
    test('handle dragging', () => {
        const onMapViewChange = jest.fn();
        const inputMap = new InputMap({ onMapViewChange })
        const ev = {
            newValue: {
                lookAt: {
                    position: {
                        lat: 0.1,
                        lng: 0.2
                    }
                }
            }
        }
        expect(onMapViewChange).toHaveBeenCalledTimes(0);
        inputMap.handleMapViewChange(ev);
        expect(onMapViewChange).toHaveBeenCalledTimes(1);
    });
});
