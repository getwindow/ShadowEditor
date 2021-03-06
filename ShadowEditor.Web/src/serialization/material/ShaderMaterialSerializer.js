import BaseSerializer from '../BaseSerializer';
import MaterialSerializer from './MaterialSerializer';

/**
 * ShaderMaterialSerializer
 * @author tengge / https://github.com/tengge1
 */
function ShaderMaterialSerializer() {
    BaseSerializer.call(this);
}

ShaderMaterialSerializer.prototype = Object.create(BaseSerializer.prototype);
ShaderMaterialSerializer.prototype.constructor = ShaderMaterialSerializer;

ShaderMaterialSerializer.prototype.toJSON = function (obj) {
    var json = MaterialSerializer.prototype.toJSON.call(this, obj);

    json.defines = obj.defines;

    json.uniforms = {};

    for (var i in obj.uniforms) {
        var uniform = obj.uniforms[i];
        if (uniform.value instanceof THREE.Color) {
            json.uniforms[i] = {
                type: 'color',
                value: uniform.value
            };
        } else {
            json.uniforms[i] = {
                value: uniform.value
            };
        }
    }

    json.vertexShader = obj.vertexShader;
    json.fragmentShader = obj.fragmentShader;

    return json;
};

ShaderMaterialSerializer.prototype.fromJSON = function (json, parent) {
    var obj = parent === undefined ? new THREE.ShaderMaterial() : parent;

    MaterialSerializer.prototype.fromJSON.call(this, json, obj);

    obj.defines = json.defines;

    obj.uniforms = {};

    for (var i in json.uniforms) {
        var uniform = json.uniforms[i];
        if (uniform.type === 'color') {
            obj.uniforms[i] = {
                value: new THREE.Color(uniform.value)
            };
        } else {
            obj.uniforms[i] = {
                value: uniform.value
            };
        }
    }

    obj.vertexShader = json.vertexShader;
    obj.fragmentShader = json.fragmentShader;

    return obj;
};

export default ShaderMaterialSerializer;