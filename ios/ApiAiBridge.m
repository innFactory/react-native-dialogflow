
#import <Foundation/Foundation.h>

#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#else
#import "RCTBridgeModule.h"
#endif


@interface RCT_EXTERN_MODULE(ApiAi, NSObject)

RCT_EXTERN_METHOD(startListening);

@end
